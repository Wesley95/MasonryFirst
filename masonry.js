//DESENVOLVIDO POR - WESLEY AQUINO SIQUEIRA
//25/12/2020

(function (e) {
    e.fn.MasonryEffect = function (v) {

        var settings = {
            masonryParentClass: ".ul-masonry-container",
            endMainSpace: 100,
            autoParentHeight: true,
            spaceBetween: 20,
            spaceTop: 20,
            initSpaceTop: 20,
            movementVelocity: 300,
            move: function () { },
            setParentHeight: function () { }
        }

        if (arguments.length > 0 && typeof arguments[0] == "object")
            this.each(function () { this.options = e.extend(settings, v); })
        else
            this.each(function () { this.options = settings; })

        var $this = $(this),
            f = function () {
                $this.each(function () {

                    var t = this,
                        main_container = $(t).parents(t.options.masonryParentClass),
                        request_width = $(t).innerWidth(),
                        count_by_row,
                        space_between;

                    count_by_row = Math.floor(main_container.innerWidth() / request_width);
                    count_by_row = count_by_row === 1 ? 2 : count_by_row;
                    space_between = Math.floor(main_container.innerWidth() % request_width) / (count_by_row - 1);

                    var index = $(t).index(),
                        column = ((1 + index) % count_by_row),
                        x = column == 0 ? count_by_row : column,
                        top = t.options.initSpaceTop,
                        left = count_by_row == 1 ? 0 : (space_between + request_width) * (x - 1);

                    if (index >= count_by_row) {

                        for (var l = index - count_by_row; l >= 0; l -= count_by_row) {
                            top += $this.eq(l).innerHeight() + t.options.spaceTop;
                        }
                    }

                    t.move = function () {
                        $(t).animate({
                            left: left + "px",
                            top: top + "px"
                        }, t.options.movementVelocity);
                    }

                    t.setParentHeight = function () {

                        if (t.options.autoParentHeight && index == $this.length - 1) {
                            var last_line_object = Math.floor($this.length / count_by_row) * count_by_row,
                                aux = 0,
                                main_height = 0;

                            last_line_object = last_line_object % count_by_row == 0 ? last_line_object - count_by_row : last_line_object;

                            for (var l = last_line_object; l < $this.length; l++) {
                                aux = 0;

                                for (var c = l; c >= 0; c -= count_by_row) {
                                    aux += $this.eq(c).innerHeight() + t.options.spaceTop;
                                }

                                main_height = aux > main_height ? aux : main_height;
                            }

                            main_height += t.options.spaceTop + t.options.endMainSpace;
                            main_container.css("height", main_height + "px");
                        }
                    }

                    t.move(top, left);
                    t.setParentHeight();
                })
            }

        setTimeout(function () {
            f();
        }, 400);

        var rtime,
            timeout = false,
            delta = 400;

        $(window).resize(function () {
            rtime = new Date();
            if (timeout === false) {
                timeout = true;
                setTimeout(resizeend, delta);
            }
        });

        function resizeend() {
            if (new Date() - rtime < delta) {
                setTimeout(resizeend, delta);

            } else {
                timeout = false;
                f();
            }
        }
    }
}(jQuery));

function InitiateItems(parent_class, item_class) {

    for (var l1 = 0; l1 < 30; l1++) {
        var rdn = 1 + Math.floor((13 - 1) * Math.random());

        var item = "<li class='li-item-masonry'><div class='box-to-select'><img src='Images/Image" + rdn + ".jpg'/><a class='selected-item'></a></div></li>",
            container = $("ul" + parent_class);

        container.append(item);

        var all = $(item_class),
            t = all.eq(all.length - 1),
            request_width = $(t).innerWidth(),
            count_by_row = 0,
            space_between = 0;

        count_by_row = Math.floor(container.innerWidth() / request_width);
        count_by_row = count_by_row === 1 ? 2 : count_by_row;
        space_between = Math.floor(container.innerWidth() % request_width) / (count_by_row - 1);

        var index = all.length - 1,
            column = ((1 + index) % count_by_row),
            x = column == 0 ? count_by_row : column,
            top = 20,
            left = count_by_row == 1 ? 0 : (space_between + request_width) * (x - 1);

        if (index >= count_by_row) {

            for (var l = index - count_by_row; l >= 0; l -= count_by_row) {
                top += all.eq(l).innerHeight() + 20;
            }
        }

        t.css({ top: top + "px", left: left + "px" });
    }

    $(item_class).MasonryEffect({
        masonryParentClass: parent_class,
        movementVelocity: 600,
        spaceBetween: 20
    });
}

setTimeout(function () {
    InitiateItems(".ul-masonry-container", ".li-item-masonry");
}, 400);