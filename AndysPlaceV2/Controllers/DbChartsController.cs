using AndysPlaceV2.Data;
using AndysPlaceV2.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;

namespace AndysPlaceV2.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DbChartsController : ControllerBase
    {

        private readonly AdventureWorksContext context;

        public DbChartsController(AdventureWorksContext _context)
        {
            context = _context;
        }


        [HttpGet]
        [Route("GetProducts")]
        public IEnumerable<DbChartData> GetProducts()
        {
            var totalProductsByCategory = context.ProductCategories.Where(c => c.ProductCategoryId > 4).ToList()
                     .GroupJoin(context.Products.ToList(),
                     cat => cat.ProductCategoryId,
                     prod => prod.ProductCategoryId,
                     (cat, prod) => new DbChartData { Category = cat.Name, TotalProducts = prod.Count() });

            return totalProductsByCategory;

        }

    }
}
