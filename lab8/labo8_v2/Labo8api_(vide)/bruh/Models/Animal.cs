namespace bruh.Models
{
    public class Animal
    {
        public int Id { get; set; }
        public string Type { get; set; }
        public string Name { get; set; }

        public Animal(int Id,string Type, string Name)
        {
            this.Id = Id;
            this.Type = Type;
            this.Name = Name;
        }
    }
}
