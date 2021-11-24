namespace AndysPlaceV2.Data
{
    public class CustomerDTO
    {
        public CustomerDTO() { }

        public int CustomerId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string CompanyName { get; set; }
        public string EmailAddress { get; set; }
        public string Phone { get; set; }
        public string OpeningDate { get; set; }
        public int CountryId { get; set; }
        public string CountryName { get; set; }
    }
}
