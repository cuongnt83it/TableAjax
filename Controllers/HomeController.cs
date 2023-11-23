using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
using System.Xml.Linq;
using Newtonsoft.Json;
using WebApplication1.Models;
using TableAjaxEdit.Models.DataModel;

namespace WebApplication1.Controllers
{
    public class HomeController : Controller
    {
        private MyDbContext _db;
        


        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger, MyDbContext db)
        {
            _logger = logger;
            _db = db;
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
        public JsonResult LoadData(int page, int pageSize=3)
        {   
            // Skip lấy từ bản ghi số mấy
            //Take lấy bao nhiêu bản ghi
             
            var model = _db.Employees.OrderByDescending(x=> x.CreatedDate)
                .Skip((page-1)*pageSize)
                .Take(pageSize).ToList();
            int totalRow = _db.Employees.Count() ;
            return Json(new
            {
                data = model,
				total =  totalRow,
                status = true
            });
        }
        [HttpPost]
        public JsonResult Update(string model)
        {
           Employee employee = JsonConvert.DeserializeObject<Employee>(model);
            //save
            Employee entity = _db.Employees.Find(employee.Id);
            entity.Salary = employee.Salary;

            return Json(new
            {
                status = true
            });
        }
    }
}