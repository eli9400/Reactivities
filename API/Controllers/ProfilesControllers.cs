
using Application.Profiles;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ProfilesController : BassApiController
    {
        [HttpGet("{username}")]
        public async Task<IActionResult> GetProfile(string username)
        {
            return HandelResult(await Mediator.Send(new Details.Query { Username = username }));
        }
          [HttpPut]
        public async Task<IActionResult> Edit(Edit.Command command)
        {
            return HandelResult(await Mediator.Send(command));
        }
        
    }
}