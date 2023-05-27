# Документация к проекту:
- Сделал деплой проекта на onrender.com
- Название хоста https://welbex-blog-app.onrender.com/

При первом выполнении request-а, запрос будет выполняться в течении 30 секунд, т.к сервис ставит работу сервера на паузу (если он никак не используется). После выполнения первого запроса,
все начинает работать вовремя. Если не выполнять запросы в течении 15 минут, то все снова становится на паузу, и первый запрос снова будет выполняться в течении 30 секунд.

# Регистрация нового пользователя
```
URL: https://welbex-blog-app.onrender.com/welbex/user/signup
Method: POST
Request Body:
```
Request Body:
```
{
    "username": "test user",
    "password": "123"
}
```
Responses:
```
201 Created: Пользователь успешно зарегестрирован.
400 Bad Request: Пользователь уже существует.
500 Internal Server Error: Ошибка при регистрации.
```

# Логин
При авторизации возвращает JWT token.

```
URL: https://welbex-blog-app.onrender.com/welbex/user/login
Method: POST

```
Request Body:
```
{
    "username": "test user",
    "password": "123"
}
```
Responses:
```
200 OK: Authentication successful. Возвращает JWT токен.
400 Bad Request: Неправильное имя пользователя или пароль.
500 Internal Server Error: Ошибка при входе.
```

# Создание поста
Нужно использовать токен который был сгенерирован при входе, формат: Bearer <token> 
    
```
URL: https://welbex-blog-app.onrender.com/welbex/post
Method: POST
Authentication: Required
```
    
Request Body:
```
{
    "message": "Hello"
}
```   
Responses:
```
201 Created: Пост успешно создан.
400 Bad Request: Неверные данные запроса.
500 Internal Server Error: Ошибка создания поста.
```
    
# Редактирование поста
Нужно использовать токен который был сгенерирован при входе. Формат: Bearer <token>.
Для редактирования опрокинуть id в конец url
    
```
URL: https://welbex-blog-app.onrender.com/welbex/post/<id>
Method: PUT
Authentication: Required
```
Request Body: 
```
{
    "message": "Изменил сообщение"
}
```
    
Responses: 
```
200 OK: Пост успешно обновлен.
400 Bad Request: Неверные данные запроса или пост не найден.
403 Forbidden: Нет прав для редактирования данного поста.
500 Internal Server Error: Ошибка обновления поста.
```
# Удаление поста
Нужно использовать токен который был сгенерирован при входе. Формат: Bearer <token>.
Для удаления опрокинуть id в конец url
```
URL: /api/posts/:id
Method: DELETE
Authentication: Required
```
Responses:
```
200 OK: Пост успешно удален.
400 Bad Request: Пост не найден.
403 Forbidden: Нет прав для удаления данного поста.
500 Internal Server Error: Ошибка удаления поста.
```
    
### Получение постов
Получает список постов блога с пагинацией.
```
URL: /api/posts
Method: GET
```
Request Parameters:
```
    {"page": "<номер страницы>"}
```
Responses:
```
200 OK: Возвращает массив постов.
500 Internal Server Error: Ошибка получения постов.
 ```


