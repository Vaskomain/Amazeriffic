var main = function (toDoObjects) {
    "use strict";
    var toDos = toDoObjects.map(function (toDo) {
        return toDo.description;
    });


    function AddTaskFromInputBox() {
        if ($(".description input").val() !== "") {
            var tags = $(".tags").val().split(",");
            var description = $(".description").val();
            toDoObjects.push({"description":description,"tags":tags});
            toDos.push(description);
            $(".tabs a:first-child span").trigger("click");
        }
    }

    var organizeByTags = function (toDoObjects) {
        // создание пустого массива для тегов
        var tags = [];
        // перебираем все задачи toDos
        toDoObjects.forEach(function (toDo) {
            // перебираем все теги для каждой задачи
            toDo.tags.forEach(function (tag) {
                // убеждаемся, что этого тега
                // еще нет в массиве
                if (tags.indexOf(tag) === -1) {
                    tags.push(tag);
                }
            });
        });
        var tagObjects = tags.map(function (tag) {
            // здесь мы находим все задачи,
            // содержащие этот тег
            var toDosWithTag = [];
            toDoObjects.forEach(function (toDo) {
                // проверка, что результат
                // indexOf is *не* равен -1
                if (toDo.tags.indexOf(tag) !== -1) {
                    toDosWithTag.push(toDo.description);
                }
            });
            // мы связываем каждый тег с объектом, который
            // содержит название тега и массив
            return {
                "name": tag,
                "toDos": toDosWithTag
            };
        });
        return tagObjects;
    };

    $(".tabs a span").toArray().forEach(function (element) {
        // создаем обработку щелчков для этого элемента
        $(element).on("click", function () {
            // поскольку мы используем версию элемента jQuery,
            // нужно создать временную переменную,
            // чтобы избежать постоянного обновления
            var $element = $(element);
            $(".tabs a span").removeClass("active");
            $element.addClass("active");
            $("main .content").empty();
            if ($element.parent().is(":nth-child(1)")) {
                var $content = $("<ul>");
                for (var i = toDos.length; i >= 0; i--) {
                    $content.append($("<li>").text(toDos[i]));
                }
                $("main .content").append($content);
            } else if ($element.parent().is(":nth-child(2)")) {
                var $content = $("<ul>");
                toDos.forEach(function (todo) {
                    $content.append($("<li>").text(todo));
                });
                $("main .content").append($content);
            } else if ($element.parent().is(":nth-child(3)")) {
                var organizedByTag = organizeByTags(toDoObjects);
                organizedByTag.forEach(function (tag) {
                    var $tagName = $("<h3>").text(tag.name),
                        $content = $("<ul>");
                    tag.toDos.forEach(function (description) {
                        var $li = $("<li>").text(description);
                        $content.append($li);
                    });
                    $("main .content").append($tagName);
                    $("main .content").append($content);
                });
            } else if ($element.parent().is(":nth-child(4)")) {
                $("main .content").append($("<p>").text("Описание:"));
                $("main .content").append($("<input>").addClass("description"));
                $("main .content").append($("<p>").text("Тэги:"));
                $("main .content").append($("<input>").addClass("tags").on("keypress",
                    function (event) {
                        if (event.keyCode === 13) {
                            AddTaskFromInputBox();
                        }
                    }));
                $("main .content").append($("<button>").text("+").on("click",
                    function (event) {
                        AddTaskFromInputBox();
                    }));
            }
            return false;
        });
    });
    $(".tabs a:first-child span").trigger("click");
};
$(document).ready(function () {
    //$.getJSON("todos.json", function (toDoObjects) {
    //    main(toDoObjects);
    //});
    var toDoObjects = [{
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
    main(toDoObjects);
});