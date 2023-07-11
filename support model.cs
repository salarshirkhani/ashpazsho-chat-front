public class User
{
    //IT CAN BE ANYTHIMG YOU WANT 
    public int Id { get; set; }
    public string Name { get; set; }
    public string Mobile { get; set; }
    public string Email { get; set; }
    public string Status { get; set; }
}

public class Support
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public string Subject { get; set; }
    public string Status { get; set; }
    public string Department { get; set; }
    public string Type { get; set; }
    public string Description { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime? DeletedAt { get; set; }

    public virtual User User { get; set; }
    public virtual ICollection<Chat> Chats { get; set; }
}

public class Chat
{
    public int Id { get; set; }
    public int SupportId { get; set; }
    public int SenderId { get; set; }
    public int? AnswerId { get; set; }
    public string Content { get; set; }
    public string File { get; set; }
    public string Status { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime? DeletedAt { get; set; }

    public virtual Support Support { get; set; }
    public virtual User Sender { get; set; }
    public virtual Chat Answer { get; set; }
    public virtual ICollection<Chat> Replies { get; set; }
}