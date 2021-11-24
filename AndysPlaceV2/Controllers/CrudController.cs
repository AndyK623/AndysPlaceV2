using AndysPlaceV2.Data;
using AndysPlaceV2.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

namespace AndysPlaceV2.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CrudController : ControllerBase
    {
        private readonly AdventureWorksContext _context;

        public CrudController(AdventureWorksContext context)
        {
            _context = context;
        }

        // GET: api/Crud
        [HttpGet]
        public async Task<ActionResult<ApiResult<CustomerDTO>>> GetCustomers(int pageIndex = 0, int pageSize = 10,
                                                                string sortColumn = null, string sortOrder = null,
                                                                string filterColumn = null, string filterQuery = null)
        {
            return await ApiResult<CustomerDTO>.CreateAsync(_context.Customers.Select(c => new CustomerDTO()
            {
                CustomerId = c.CustomerId,
                FirstName = c.FirstName,
                LastName = c.LastName,
                CompanyName = c.CompanyName,
                EmailAddress = c.EmailAddress,
                Phone = c.Phone,
                OpeningDate = c.OpeningDate.ToShortDateString(),
                CountryId = c.Country.Id,
                CountryName = c.Country.Name,
            }), pageIndex, pageSize, sortColumn, sortOrder, filterColumn, filterQuery);
        }

        // GET: api/Crud/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Customer>> GetCustomer(int id)
        {
            var customer = await _context.Customers.FindAsync(id);

            if (customer == null)
            {
                return NotFound();
            }

            return customer;
        }

        // PUT: api/Crud/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCustomer(int id, Customer customer)
        {
            if (id != customer.CustomerId)
            {
                return BadRequest();
            }

            _context.Entry(customer).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CustomerExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Crud
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Customer>> PostCustomer(Customer customer)
        {
            _context.Customers.Add(customer);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCustomer", new { id = customer.CustomerId }, customer);
        }

        // DELETE: api/Crud/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCustomer(int id)
        {
            var customer = await _context.Customers.FindAsync(id);
            if (customer == null)
            {
                return NotFound();
            }

            _context.Customers.Remove(customer);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CustomerExists(int id)
        {
            return _context.Customers.Any(e => e.CustomerId == id);
        }


        [HttpPost]
        [Route("IsDupeCustomer")]
        public bool IsDupeCustomer(Customer customer)
        {
            return _context.Customers.Any(c => (c.CustomerId != customer.CustomerId) &&
                                               (c.FirstName == customer.FirstName &&
                                                c.LastName == customer.LastName &&
                                                c.CompanyName == customer.CompanyName));
        }
    }
}
