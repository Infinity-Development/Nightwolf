# Nightwolf
API Server for handling the Infinity Bot List Widgets

---

## Endpoints

- `/bot/:botID`

> example: `/bot/187636089073172481`

---

## Available Query's

| Query    |      Description         |  Example                                                      |
|----------|:------------------------:|--------------------------------------------------------------:|
| size     |  The size of the widget  | widgets.infinitybots.gg/bot/187636089073172481?size=large     |
| theme    |  The widget background   | widgets.infinitybots.gg/bot/187636089073172481?theme=light    |
| accent   | The widget accent color  | widgets.infinitybots.gg/bot/187636089073172481?accent=violet  |

### Available Query Params

| Param    |      Description         |  Options                                            |
|----------|:------------------------:|----------------------------------------------------:|
| size     |  The size of the widget  | small, large                                        |
| theme    |  The widget background   | dark, light                                         |
| accent   | The widget accent color  | violet, blue, rose, emerald, amber, summer          |

> NOTE: We have a default widget available by providing no query

> NOTE: All query params are optional (example: you can use theme without any other query's)


---

## Examples

- `https://widgets.infinitybots.gg/bot/187636089073172481?size=large`
- `https://widgets.infinitybots.gg/bot/187636089073172481?size=large&theme=light`
- `https://widgets.infinitybots.gg/bot/187636089073172481?size=large&theme=light&accent=violet`