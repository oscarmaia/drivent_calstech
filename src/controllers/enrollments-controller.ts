import { AuthenticatedRequest } from '@/middlewares';
import enrollmentsService from '@/services/enrollments-service';
import axios from 'axios';
import { Response, Request } from 'express';
import httpStatus from 'http-status';
import { ViaCEPAddress, ViaCEPAddressResponse } from '@/protocols';
export async function getEnrollmentByUser(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;

  try {
    const enrollmentWithAddress = await enrollmentsService.getOneWithAddressByUserId(userId);

    return res.status(httpStatus.OK).send(enrollmentWithAddress);
  } catch (error) {
    return res.sendStatus(httpStatus.NO_CONTENT);
  }
}

//AuthenticatedRequest
export async function postCreateOrUpdateEnrollment(req: AuthenticatedRequest, res: Response) {
  try {
    await enrollmentsService.createOrUpdateEnrollmentWithAddress({
      ...req.body,
      userId: req.userId,
    });

    return res.sendStatus(httpStatus.OK);
  } catch (error) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}
//AuthenticatedRequest
export async function getAddressFromCEP(req: AuthenticatedRequest, res: Response) {
  const { cep } = req.query as Record<string, string>;
  try {
    const result = await enrollmentsService.getAddressFromCEP(cep)
    res.send(result)
  } catch (error) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}
