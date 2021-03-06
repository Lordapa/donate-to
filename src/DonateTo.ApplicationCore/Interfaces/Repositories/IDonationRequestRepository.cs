﻿using DonateTo.ApplicationCore.Entities;
using System.Threading.Tasks;

namespace DonateTo.ApplicationCore.Interfaces.Repositories
{
    public interface IDonationRequestRepository : IRepository<DonationRequest>
    {
        Task SoftDeleteDonationRequest(long donationRequestId);
    }
}
