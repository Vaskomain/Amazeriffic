var express = require("express"),
    http = require("http"),
    app = express(),
    toDos = [{
            "description": "Купить продукты",
            "tags": ["шопинг", "рутина"]
        },
        {
            "description": "Сделать несколько новых задач",
            "tags": ["писательство", "работа"]
        },
        {
            "description": "Подготовиться к лекции в понедельник",
            "tags": ["работа", "преподавание"]
        },
        {
            "description": "Ответить на электронные письма",
            "tags": ["работа"]
        },
        {
            "description": "Вывести Грейси на прогулку в парк",
            "tags": ["рутина", "питомцы"]
        },
        {
            "description": "Закончить писать книгу",
            "tags": ["писательство", "работа"]
        }
    ];
app.use(express.static(__dirname + "/client"));
http.createServer(app).listen(3000);
// этот маршрут замещает наш файл
// todos.json в примере из главы 5
app.get("/todos.json", function (req, res) {
    res.json(toDos);
});
app.use(express.urlencoded());
app.post("/todos", function (req, res) {
    var newToDo = req.body;
    console.log(newToDo);
    toDos.push(newToDo);// простой объект отправлен обратно
    res.json({
        "message": "Вы размещаетесь на сервере!"
    });
});