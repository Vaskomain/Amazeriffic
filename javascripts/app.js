var main = function () {
    "use strict";
    var toDos = [
        "Закончить писать эту книгу",
        "Вывести Грейси на прогулку в парк",
        "Ответить на электронные письма",
        "Подготовиться к лекции в понедельник",
        "Обновить несколько новых задач",
        "Купить продукты"
    ];
    function AddTaskFromInputBox() {
        if ($(".task-input input").val() !== "") {
            console.log($(".task-input").val());
            toDos.push($(".task-input").val());
            $(".tabs a:first-child span").trigger("click");
        };
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
                };
                $("main .content").append($content);
            } else if ($element.parent().is(":nth-child(2)")) {
                var $content = $("<ul>");
                toDos.forEach(function (todo) {
                    $content.append($("<li>").text(todo));
                });
                $("main .content").append($content);
            } else if ($element.parent().is(":nth-child(3)")) {
                $("main .content").append($("<ul>").text("Введите новую задачу:"));
                $("main .content").append($("<input>").addClass("task-input").on("keypress",
                    function (event) {
                        if (event.keyCode === 13) {
                            AddTaskFromInputBox();
                        };
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
$(document).ready(main);