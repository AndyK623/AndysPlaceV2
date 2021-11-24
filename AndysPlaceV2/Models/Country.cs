using System.Text.Json.Serialization;

#nullable disable

namespace AndysPlaceV2.Models
{
    public partial class Country
    {
        public int Id { get; set; }
        [JsonIgnore]
        public string Iso { get; set; }
        public string Name { get; set; }
        [JsonIgnore]
        public string Iso3 { get; set; }
        [JsonIgnore]
        public int? NumCode { get; set; }
        [JsonIgnore]
        public int PhoneCode { get; set; }
    }
}
