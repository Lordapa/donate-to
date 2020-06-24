﻿using DonateTo.ApplicationCore.Entities;
using System.Threading.Tasks;

namespace DonateTo.ApplicationCore.Interfaces.Services
{
    public interface IDonationService : IBaseService<Donation>
    {
        /// <summary>
        /// Send Created donation info mail to user
        /// </summary>
        /// <param name="donation">Donation</param>
        /// <param name="client">Client</param>
        /// <returns></returns>
        Task SendNewDonationMailAsync(Donation donation, User user, string client);
    }
}