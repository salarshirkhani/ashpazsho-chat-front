using Dapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Model;
using System;
using System.IO;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class userTicketController : ControllerBase
    {

        #region ctors
        public userTicketController(IConfiguration configuration, context dbcontext)
        {
            Configuration = configuration;
            Con = dbcontext;
        }

        public IConfiguration Configuration { get; }
        public context Con { get; }
        #endregion

        #region  services
        [HttpGet("[action]")]
        [Authorize]
        public ServiceResult Tickets( string status)
        {
            Con.httpContext = HttpContext;
            ServiceResult result = new ServiceResult();
            try
            {
                var currentuser = Extensions.GetCurrentUserId(Con.httpContext);
                var supports = Con.supports.OrderByDescending(s => s.createTime).Where(s => s.userId == currentuser && s.status==status).ToList();

                result.message = "";
                result.messageType = MessageType.OK;
                result.objectResult = supports;
            }
            catch (Exception ex)
            {
                result.messageType = MessageType.Error;
                result.message = ex.Message;
                result.objectResult = ex;
            }

            return result;
        }



        [HttpPost("[action]")]
        [Authorize]
        public ServiceResult Sendsupport(SupportViewModel model)
        {
            Con.httpContext = HttpContext;
            ServiceResult result = new ServiceResult();
            try
            {
                var currentuser = Extensions.GetCurrentUserId(Con.httpContext);
                var support = new support
                {
                    userId = currentuser,
                    subject = model.subject,
                    // i don't knnow what is your departmat :) 
                    department = model.department,
                    description = model.description,
                    // we have 3 types in our support system one of them is normal another is neccessary and last one is critical 
                    type = model.type,
                    status = "new"
                };
                Con.supports.Add(support);
                Con.SaveChanges();

                var sup = Con.supports.OrderByDescending(s => s.createTime).FirstOrDefault(s => s.userId == currentuser && s.status == "new");
                if (sup != null)
                {
                    var chat = new chat
                    {
                        senderId = currentuser,
                        supportId = sup.id,
                        content = model.description,
                        status = "new"
                    };
                    Con.chats.Add(chat);
                    Con.SaveChanges();

                    
                    result.message = "";
                    result.messageType = MessageType.OK;
                    result.objectResult = new { id = sup.id };
                }
                else
                {
                    // handle support not found
                    result.messageType = MessageType.Error;
                    result.message = "تیکت مورد نظر پیدا نشد";
                    result.objectResult = null;
                }
               
            }
            catch (Exception ex)
            {
                result.messageType = MessageType.Error;
                result.message = ex.Message;
                result.objectResult = ex;
            }

            return result;
        }


        [HttpPost("[action]")]
        [Authorize]
        public ServiceResult Chats(long chatinfo)
        {
            Con.httpContext = HttpContext;
            ServiceResult result = new ServiceResult();
            try
            {
                var chats = Con.chats.Where(c => c.supportId == chatinfo).ToList();
                foreach (var item in chats)
                {
                    var currentuser = Extensions.GetCurrentUserId(Con.httpContext);
                    if (item.senderId != currentuser)
                    {
                        item.status = "read";
                        Con.SaveChanges();
                    }
                }

                result.message = "";
                result.messageType = MessageType.OK;
                result.objectResult = chatinfo;
            }
            catch (Exception ex)
            {
                result.messageType = MessageType.Error;
                result.message = ex.Message;
                result.objectResult = ex;
            }

            return result;
        }


        [HttpPost("[action]")]
        [Authorize]
        public ServiceResult Message(chat chatinfo)
        {
            Con.httpContext = HttpContext;
            ServiceResult result = new ServiceResult();
            try
            {
                chatinfo.status = "new";
               
                var support = Con.supports.Find(chatinfo.supportId);
                if (support != null)
                {
                    support.status = "new";
                    Con.SaveChanges();
                }

                Con.chats.Add(chatinfo);
                Con.SaveChanges();

                result.message = "پیام ارسال شد";
                result.messageType = MessageType.OK;
                result.objectResult = chatinfo;
            }
            catch (Exception ex)
            {
                result.messageType = MessageType.Error;
                result.message = ex.Message;
                result.objectResult = ex;
            }

            return result;
        }


        [HttpPost("[action]")]
        [Authorize]
        public ServiceResult Close(long id)
        {
            Con.httpContext = HttpContext;
            ServiceResult result = new ServiceResult();
            try
            {
                var support = Con.supports.Find(id);
                if (support != null)
                {
                    support.status = "closed";
                    Con.SaveChanges();
                }
             
                result.message = "تیکت بسته شد";
                result.messageType = MessageType.OK;
                result.objectResult = support;
            }
            catch (Exception ex)
            {
                result.messageType = MessageType.Error;
                result.message = ex.Message;
                result.objectResult = ex;
            }

            return result;
        }


        #endregion

        #region functions

        #endregion
    }
}
