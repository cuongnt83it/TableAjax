using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
using System.Xml.Linq;
using Newtonsoft.Json;
using WebApplication1.Models;

namespace WebApplication1.Controllers
{
    public class HomeController : Controller
    {

        List<EmployeeModel> listEmployee = new List<EmployeeModel>() {
        new EmployeeModel()
        {
            Id = 1,
            Name = "Nguyễn Văn A",
            Salary = 30000,
            Status = true
        },
        new EmployeeModel()
        {
            Id = 2,
            Name = "Nguyễn Văn A",
            Salary = 30000,
            Status = true
        },
            new EmployeeModel()
            {
            Id = 3,
            Name = "Nguyễn Văn B",
            Salary = 20000,
            Status = false
        },
        new EmployeeModel()
        {
            Id = 4,
            Name = "Nguyễn Văn C",
            Salary = 30006,
            Status = true
        },
        new EmployeeModel()
        {
            Id = 4,
            Name = "Nguyễn Văn D",
            Salary = 355000,
            Status = false
        },
        new EmployeeModel()
        {
            Id = 6,
            Name = "Nguyễn Văn E",
            Salary = 366660,
            Status = true
        }};
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }

        [HttpGet]
        public JsonResult LoadData()
        {
           
            return Json(new
            {
                data = listEmployee,
                status = true
            });
        }
        [HttpPost]
        public JsonResult Update(string model)
        {
           EmployeeModel employee = JsonConvert.DeserializeObject<EmployeeModel>(model);
            //save
            EmployeeModel entity = listEmployee.Single(x => x.Id == employee.Id);
            entity.Salary = employee.Salary;

            return Json(new
            {
                status = true
            });
        }
    }
}