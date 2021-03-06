﻿using AutoMapper;
using DonateTo.ApplicationCore.Entities;
using DonateTo.ApplicationCore.Interfaces;
using DonateTo.ApplicationCore.Interfaces.Repositories;
using DonateTo.ApplicationCore.Interfaces.Services;
using DonateTo.ApplicationCore.Models.Filtering;
using System.Threading.Tasks;

namespace DonateTo.Services
{
    public class StatusService : BaseService<Status, BaseFilterModel>
    {
        private readonly IRepository<Status> _statusRepository;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public StatusService(
            IRepository<Status> statusRepository,
            IMapper mapper,
            IUnitOfWork unitOfWork) : base(statusRepository, unitOfWork)
        {
            _statusRepository = statusRepository;
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }
    }
}