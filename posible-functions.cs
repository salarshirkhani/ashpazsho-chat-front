//POSIIBLE USERS FUNCTION 

//SHOW USER TICKETS
public ActionResult Tickets()
{
    var supports = db.Supports.OrderByDescending(s => s.CreatedAt).Where(s => s.UserId == User.Identity.GetUserId()).ToList();
    return View(supports);
}

public ActionResult Support()
{
    return View();
}

public ActionResult Profile()
{
    return View();
}

// MAKE A NEW TICKET 

public ActionResult Sendsupport(SupportViewModel model)
{
    if (!ModelState.IsValid)
    {
        // handle validation errors
        return View(model);
    }

    var support = new Support
    {
        UserId = model.UserId,
        Subject = model.Subject,
        // i don't knnow what is your departmat :) 
        Department = model.Department,
        Description = model.Description,
        // we have 3 types in our support system one of them is normal another is neccessary and last one is critical 
        Type = model.Type,
        status = "new"
    };
    db.Supports.Add(support);
    db.SaveChanges();

    var sup = db.Supports.OrderByDescending(s => s.created_at).FirstOrDefault(s => s.user_id == User.Identity.GetUserId() && s.status == "new");
    if (sup != null)
    {
        var chat = new Chat
        {
            SenderId = model.SenderId,
            SupportId = sup.SupportId,
            AnswerId = model.AnswerId,
            Content = model.Content,
            status = "new"
        };
        db.Chats.Add(chat);
        db.SaveChanges();

        return RedirectToAction("Chat", "Customer", new { id = sup.id });
    }
    else
    {
        // handle support not found
        TempData["error"] = "تیکت مورد نظر پیدا نشد";
        return RedirectToAction("Index", "Home");
    }
}

//SHOW CHATS ON THE TICKET PAGE

public ActionResult Chats(int id)
{
    var chats = chat.Where(c => c.SupportId == id).ToList();
    foreach (var item in chats)
    {
        if (item.SenderId != User.Identity.GetUserId())
        {
            item.status = "read";
            db.SaveChanges();
        }
    }
    return View("dashboard.customer.chat", chats);
}

//SEND MESSAGE AND SEND SMS TO ADMINASTOR

public ActionResult Message(MessageViewModel model)
{
    if (!ModelState.IsValid)
    {
        // handle validation errors
        return View(model);
    }

    var chat = new Chat
    {
        SenderId = model.SenderId,
        SupportId = model.SupportId,
        AnswerId = model.AnswerId,
        Content = model.Content,
        status = "new"
    };

    // send message via API
    var url = "https://ippanel.com/services.jspd";
    var rcpt_nm = new[] { "09372833776" };
    var param = new Dictionary<string, string>
    {
        { "uname", " " },
        { "pass", " " },
        { "from", "90000145" },
        { "message", "پیام جدید  ثبت شد" },
        { "to", JsonConvert.SerializeObject(rcpt_nm) },
        { "op", "send" }
    };
    using (var client = new HttpClient())
    {
        var response = client.PostAsync(url, new FormUrlEncodedContent(param)).Result;
        if (!response.IsSuccessStatusCode)
        {
            // handle API errors
        }
    }

    var support = db.Supports.Find(model.SupportId);
    if (support != null)
    {
        support.status = "new";
        db.SaveChanges();
    }

    db.Chats.Add(chat);
    db.SaveChanges();

    TempData["info"] = "پیام ارسال شد";
    return RedirectToAction("Index", "Home");
}

//CLOSE TICKET

public ActionResult Close(int SupportId)
{
    var support = db.Supports.Find(SupportId);
    if (support != null)
    {
        support.status = "closed";
        db.SaveChanges();
        TempData["info"] = "تیکت بسته شد";
    }
    else
    {
        // handle support not found
        TempData["error"] = "تیکت مورد نظر پیدا نشد";
    }
    return RedirectToAction("Index", "Home");
}