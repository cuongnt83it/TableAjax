var homeconfig = { pageSize:5, pageIndex:1}
var homeController = {
    init: function () {
       
        homeController.loadData();
        homeController.registerEvent();
    },
    registerEvent: function () {
        $('.txtSalary').off('keypress').on('keypress', function (e) {
            if (e.which == 13) {
                var id = $(this).data("id");
                var value = $(this).val();
                homeController.updateSalary(id, value);
            }
        });
    },
    updateSalary: function (id, value) {
        var data = {
            ID: id,
            Salary: value
        };
        $.ajax({
            url: 'Home/Update',
            type: 'POST',
            dataType: 'json',
            data: { model: JSON.stringify(data)},
            success: function (response) {
                if (response.status) {
                    alert('Update successed');
                } else {
                    alert('Update failed!');
                }
            }
        }) 
    },

    loadData: function () {
      
        $.ajax({
            url: 'Home/LoadData',
            type: 'GET',
            data: {
                page: homeconfig.pageIndex,
                pageSize: homeconfig.pageSize
            },
            dataType: 'Json',
            success: function (response) {
                if (response.status) {
                    var data = response.data;
                    var html = '';
                    var template = $('#data-template').html();
                    Mustache.parse(template);
                    $.each(data, function (i, item) {
                        html += Mustache.render(template, {
                            ID: item.id,
                            Name: item.name,
                            Salary: item.salary,
                            Status: item.status == 1 ? "<span class=\"btn btn-success\">Actived</span>" : "<span class=\"btn  btn-danger\">Locked</span>"
                        });
                    });
                    $('#tblData').html(html);
                    homeController.paging(response.total, function () {
                        homeController.loadData();
                    });
                    homeController.registerEvent();
                }
            }
        })
    },
    paging: function (totalRow, callback) {
        var totalPage = Math.ceil(totalRow / homeconfig.pageSize);

        $('#pagination').twbsPagination({
            totalPages: totalPage,
            first: "Đầu",
            next: "Tiếp",
            last: "Cuối",
            prev: "Trước",
            visiblePages: 10,
            onPageClick: function (event, page) {
                homeconfig.pageIndex = page;
                //setTimeout(callback, 2000);
                callback();
            }
        });
    }
}
homeController.init();