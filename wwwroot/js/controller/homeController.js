var homeconfig = { pageSize:10, pageIndex:1}
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
        $('#btnAddNew').off('click').on('click', function (e) {
            $('#modelAddUpdate').modal('show');
            homeController.resetForm();
        });
        $('#btnSave').off('click').on('click', function (e) {
            homeController.saveData();
        });
    },
    resetForm: function () {
        $('#hdId').val('0');
        $('#txtName').val('');
        $('#txtSalary').val(0);
        $('#ckStatus').prop('ckecked',true);
    },
    saveData: function () {
        var id = parseInt($('#hdId').val());
        var name =  $('#txtName').val();
        var salary = parseFloat($('#txtSalary').val());
        var status = $('#ckStatus').prop('checked');
        var employee= {
            ID: id,
            Name: name,
            Salary: salary,
            Status: status
        };
        $.ajax({
            url: 'Home/SaveData',
            type: 'POST',
            dataType: 'json',
            data: {
                model: JSON.stringify(employee)
            },
            success: function (response) {
                if (status == true) {
                    alert('Save success');
                    $('#modelAddUpdate').modal('hide');
                    homeController.loadData();
                } else {
                    alert(response.message);
                }
            },
            error: function (err) {
                console.log(err);
            }
        })
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