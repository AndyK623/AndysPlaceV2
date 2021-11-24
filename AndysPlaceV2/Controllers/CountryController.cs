using AndysPlaceV2.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AndysPlaceV2.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CountryController : ControllerBase
    {
        private readonly AdventureWorksContext context;

        public CountryController(AdventureWorksContext _context)
        {
            context = _context;
        }


        //GET: api/Country
        [HttpGet]
        public async Task<ActionResult<List<Country>>> GetCountries()
        {
            return context.Countries.OrderBy(c => c.Name).ToList();
        }

    }
}
