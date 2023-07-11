//GET SUPPORTS 
public ActionResult GetManagePost()
{
    var supports = db.Supports.OrderByDescending(s => s.CreatedAt).ToList();
    return View("dashboard.admin.support.manage", supports);
}

//GET CHATS WHERE HAVE SAME SUPPORT ID
public ActionResult ShowPost(int Id)
{
    var support = db.Supports.Find(Id);
    var chats = db.Chats.Where(c => c.SupportId == Id).ToList();
    foreach (var item in chats)
    {
        if (item.SenderId != User.Identity.GetUserId())
        {
            item.status = "read";
            db.SaveChanges();
        }
    }
    return View("dashboard.admin.support.show", new { support, chats });
}

//SEND MESSSAGE
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
        Status = "new"
    };
    db.Chats.Add(chat);

    var support = db.Supports.Find(model.SupportId);
    if (support != null)
    {
        support.status = "pending";
        if (!string.IsNullOrEmpty(support.person?.mobile))
        {
            var url = "https://ippanel.com/services.jspd";
            var rcpt_nm = new[] { support.person.mobile };
            var param = new Dictionary<string, string>
            {
                { "uname", "" },
                { "pass", "" },
                { "from", "90000145" },
                { "message", "پیام جدیدی برای شما ارسال شد" },
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
        }
        db.SaveChanges();
    }
    else
    {
        // handle support not found
    }

    TempData["info"] = "پیام با موفقیت ارسال شد";
    return RedirectToAction("ShowPost", "Admin", new { id = model.SupportId });
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
    }
    return RedirectToAction("GetManagePost", "Admin");
}

public ActionResult SoftDelete(int SupportId)
{
    var support = db.Supports.Find(SupportId);
    if (support != null)
    {
        support.is_deleted = true;
        support.DeletedAt = DateTime.UtcNow;
        db.SaveChanges();
        TempData["info"] = "تیکت حذف شد";
    }
    else
    {
        // handle support not found
    }
    return RedirectToAction("GetManagePost", "Admin");
}