using System;
using System.ComponentModel.DataAnnotations.Schema;

#nullable disable

namespace AndysPlaceV2.Models
{
    public partial class Customer
    {
        public int CustomerId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string CompanyName { get; set; }
        public string EmailAddress { get; set; }
        public string Phone { get; set; }
        public DateTime OpeningDate { get; set; }


        [ForeignKey(nameof(Country))]
        public int CountryId { get; set; }

        ///<summary>
        /// The country related to the city
        /// </summary>
        public virtual Country Country { get; set; }
    }
}
