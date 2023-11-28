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
        $('.btnEdit').off('click').on('click', function (e) {
            var id = $(this).data('id');
            homeController.loadForm(id);
            $('#modelAddUpdate').modal('show');
        });
        $('.btnDelete').off('click').on('click', function (e) {
            var id = $(this).data('id');
            var x = confirm("Are you sure you want to delete?");
            if (x) {
                homeController.deleteItem(id);
            }
        });
        $('#btnSearch').off('click').on('click', function (e) {
            homeController.loadData(true);
        });
        $('#txtNameSearch').off('keypress').on('keypress', function (e) {
            if (e.which == 13) {
                
                homeController.loadData(true);
            }
        });
        $('#btnReset').off('click').on('click', function (e) {

             $('#txtNameSearch').val('');
            $('#ddlStatusSearch').val('');
            homeController.loadData(true);
        });
    },
    resetForm: function () {
        $('#hdId').val('0');
        $('#txtName').val('');
        $('#txtSalary').val(0);
        $('#ckStatus').prop('checked',true);
    },
    loadForm: function (id) {
        $.ajax({
            url: 'Home/LoadDetail',
            type: 'GET',
            dataType: 'json',
            data: { Id: id },
            success: function (response) {
                if (response.status) {
                    var data = response.data;
                    $('#hdId').val(data.id);
                    $('#txtName').val(data.name);
                    $('#txtSalary').val(data.salary);
                    $('#ckStatus').prop('checked',data.status);
                } else {
                    alert('Load failed!');
                }
            }
        }) 
    },
    deleteItem: function (id) {
        $.ajax({
            url: 'Home/DeleteItem',
            type: 'GET',
            dataType: 'json',
            data: { Id: id },
            success: function (response) {
                if (response.status) {
                    homeController.loadData(true);
                } else {
                    alert('Delete failed!');
                }
            }
        }) 
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
                if (response.status == true) {
                    alert('Save success');
                    $('#modelAddUpdate').modal('hide');
                    homeController.loadData(true);
                   
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

    loadData: function (changePageSize) {
        var name = $('#txtNameSearch').val();
        var status = $('#ddlStatusSearch').val();
        $.ajax({
            url: 'Home/LoadData',
            type: 'GET',
            data: {
                name: name,
                status: status,
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
                    }, changePageSize);
                    homeController.registerEvent();
                }
            }
        })
    },
    paging: function (totalRow, callback, changePageSize) {
        var totalPage = Math.ceil(totalRow / homeconfig.pageSize);
        if ($('#pagination a').length == 0 || changePageSize == true) {
            $('#pagination').empty();
            $('#pagination').removeData("twbs-pagination");
            $('#pagination').unbind("page");
        }

        $('#pagination').twbsPagination({
            totalPages: totalPage,
            first: "Đầu",
            next: "Tiếp",
            last: "Cuối",
            prev: "Trước",
            visiblePages: 10,
            onPageClick: function (event, page) {
                homeconfig.pageIndex = page;
                setTimeout(callback, 2000);
                callback();
            }
        });
    }
}
homeController.init();