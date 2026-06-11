"""
AI-агент помощника продавца Бобёр Строй.
Отвечает на вопросы об ассортименте и технике продаж.
Использует контекст с сайта bober-stroy.ru через OpenAI GPT-4o-mini.
"""
import json
import os
import urllib.request
import urllib.error
from html.parser import HTMLParser


CORS_HEADERS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, X-User-Id, X-Auth-Token",
    "Content-Type": "application/json",
}

SYSTEM_PROMPT = """Ты — AI-помощник продавца строительного магазина «Бобёр Строй» в Нижнем Тагиле.

Твоя задача:
1. Помогать продавцу консультировать покупателей по ассортименту магазина
2. Давать советы по технике продаж (5 шагов: приветствие → выявление потребности → презентация → работа с возражениями → допродажа и завершение)
3. Отвечать кратко, практично и на русском языке

Магазин продаёт:
- Сантехнику: смесители, унитазы, ванны, трубы, душевые кабины (https://www.bober-stroy.ru/santekhnika/)
- Товары для сада: инструменты, шланги, теплицы, поликарбонат, капельный полив (https://www.bober-stroy.ru/sad/)
- Скобяные изделия: замки, петли, крепёж, фурнитура (https://www.bober-stroy.ru/skobyanye_izdeliya/)
- Краски: интерьерные, фасадные, грунтовки

Стиль ответов:
- Используй конкретные рекомендации, а не общие слова
- При вопросе о товаре — называй 2-3 варианта с разными ценовыми сегментами
- При вопросе о технике продаж — давай готовые фразы, которые можно использовать прямо сейчас
- Будь дружелюбным, как опытный коллега
- Ответы не длиннее 200 слов

Режим "train" (обучение): давай советы по технике продаж с примерами фраз
Режим "consult" (консультация): помогай консультировать конкретного покупателя прямо сейчас
"""


class HTMLTextExtractor(HTMLParser):
    def __init__(self):
        super().__init__()
        self.text_parts = []
        self._skip_tags = {"script", "style", "nav", "footer", "head"}
        self._current_skip = 0

    def handle_starttag(self, tag, attrs):
        if tag in self._skip_tags:
            self._current_skip += 1

    def handle_endtag(self, tag):
        if tag in self._skip_tags and self._current_skip > 0:
            self._current_skip -= 1

    def handle_data(self, data):
        if self._current_skip == 0:
            text = data.strip()
            if text and len(text) > 2:
                self.text_parts.append(text)

    def get_text(self):
        return " ".join(self.text_parts[:200])


def fetch_page_text(url: str, max_chars: int = 2000) -> str:
    try:
        req = urllib.request.Request(
            url,
            headers={"User-Agent": "Mozilla/5.0 (compatible; BeaverBot/1.0)"},
        )
        with urllib.request.urlopen(req, timeout=5) as resp:
            html = resp.read().decode("utf-8", errors="ignore")
        parser = HTMLTextExtractor()
        parser.feed(html)
        return parser.get_text()[:max_chars]
    except Exception:
        return ""


def call_openai(messages: list, api_key: str) -> str:
    payload = json.dumps({
        "model": "gpt-4o-mini",
        "messages": messages,
        "max_tokens": 400,
        "temperature": 0.7,
    }).encode("utf-8")

    req = urllib.request.Request(
        "https://api.openai.com/v1/chat/completions",
        data=payload,
        headers={
            "Content-Type": "application/json",
            "Authorization": f"Bearer {api_key}",
        },
        method="POST",
    )

    with urllib.request.urlopen(req, timeout=25) as resp:
        result = json.loads(resp.read().decode("utf-8"))

    return result["choices"][0]["message"]["content"].strip()


def handler(event: dict, context) -> dict:
    """Обрабатывает запросы к AI-агенту помощника продавца."""

    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": CORS_HEADERS, "body": ""}

    api_key = os.environ.get("OPENAI_API_KEY", "")
    if not api_key:
        return {
            "statusCode": 503,
            "headers": CORS_HEADERS,
            "body": json.dumps({"reply": "AI-агент не настроен. Добавьте OPENAI_API_KEY в секреты."}),
        }

    body = json.loads(event.get("body") or "{}")
    user_message = body.get("message", "").strip()
    mode = body.get("mode", "consult")
    history = body.get("history", [])

    if not user_message:
        return {
            "statusCode": 400,
            "headers": CORS_HEADERS,
            "body": json.dumps({"error": "message is required"}),
        }

    # Определяем нужно ли подгружать контекст с сайта
    site_context = ""
    keywords_santech = ["смесит", "унитаз", "ванн", "труб", "сантехник", "душ", "кран"]
    keywords_garden = ["теплиц", "шланг", "полив", "сад", "лопат", "поликарбонат"]
    keywords_hardware = ["замок", "замк", "петл", "шуруп", "гвозд", "дюбел", "скоб", "крепёж"]
    keywords_paint = ["краск", "грунт", "покраск", "колеров", "эмал", "лак"]

    msg_lower = user_message.lower()
    fetch_url = None

    if any(k in msg_lower for k in keywords_santech):
        fetch_url = "https://www.bober-stroy.ru/santekhnika/"
    elif any(k in msg_lower for k in keywords_garden):
        fetch_url = "https://www.bober-stroy.ru/sad/"
    elif any(k in msg_lower for k in keywords_hardware):
        fetch_url = "https://www.bober-stroy.ru/skobyanye_izdeliya/"
    elif any(k in msg_lower for k in keywords_paint):
        fetch_url = "https://www.bober-stroy.ru/"

    if fetch_url:
        page_text = fetch_page_text(fetch_url, max_chars=1500)
        if page_text:
            site_context = f"\n\nКонтекст с сайта ({fetch_url}):\n{page_text}"

    mode_hint = (
        "Режим: помощь продавцу в консультации покупателя прямо сейчас."
        if mode == "consult"
        else "Режим: обучение технике продаж, дай практические советы с готовыми фразами."
    )

    system = SYSTEM_PROMPT + f"\n\n{mode_hint}" + site_context

    messages = [{"role": "system", "content": system}]

    for h in history[-6:]:
        role = h.get("role", "user")
        if role in ("user", "assistant") and h.get("content"):
            messages.append({"role": role, "content": h["content"]})

    messages.append({"role": "user", "content": user_message})

    reply = call_openai(messages, api_key)

    return {
        "statusCode": 200,
        "headers": CORS_HEADERS,
        "body": json.dumps({"reply": reply}, ensure_ascii=False),
    }
