# avd.karlovo.net — Карта на дефибрилаторите (AED), Община Карлово

Статичен сайт. Един източник на истина: [`data/defibrillators.geojson`](data/defibrillators.geojson).
Хостинг: Cloudflare Pages. Всеки `git push` към `main` прави автоматичен deploy.

## Добавяне на нова точка

Редактирай `data/defibrillators.geojson` и добави обект в `features`:

```json
{
  "type": "Feature",
  "geometry": { "type": "Point", "coordinates": [ДЪЛЖИНА, ШИРИНА] },
  "properties": {
    "name": "Име на обекта",
    "city": "Карлово",
    "address": "ул. „...“ №",
    "access": "Точно къде е уредът в сградата — напр. фоайе, до рецепцията",
    "hours": "Кога е достъпен — напр. Пон–Пет 08:00–17:00",
    "checked": "2026-06-22"
  }
}
```

**Внимание — `coordinates` са `[lng, lat]` (дължина първа, ширина втора).** Това е обратно на
повечето карти, които показват `lat, lng`. Сбъркаш ли реда, точката пада в Сомалия.

Вземане на координати: десен бутон в Google Maps → първият ред са `lat, lng` → размени ги при
въвеждане в GeoJSON.

Полетата `access` и `hours` може да са празни (`""`), но `access` е важно — при спешност секундите
броят. Попълвай го веднага щом е известно.

## Локална проверка

```bash
python3 -m http.server 8080
# отвори http://localhost:8080
```

GeoJSON-ът трябва да е валиден JSON. Бърза проверка:

```bash
python3 -c "import json; json.load(open('data/defibrillators.geojson'))" && echo OK
```

## Файлове

| Файл | Роля |
|---|---|
| `index.html` | Картата (Leaflet + OpenStreetMap), целият UI inline |
| `data/defibrillators.geojson` | Точките — единственото, което се редактира редовно |
| `_headers` | Сигурност + кеш правила за Cloudflare Pages |

## Tiles

По подразбиране OpenStreetMap raster tiles (без ключ). За голям трафик мини към платен/собствен
доставчик (MapTiler, Stadia) — сменя се само `L.tileLayer(...)` URL-ът в `index.html`.

## Важно

Това е помощно средство, не заместител на спешната помощ. Първото действие при сърдечен арест
винаги е **обаждане на 112**. Координатите са геокодирани към сградите; точното място на уреда
вътре (`access`) се потвърждава на терен преди да се разчита на него.
