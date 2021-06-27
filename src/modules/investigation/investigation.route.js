import express from 'express';
import { 
    createInvestigation, 
    fetchInvestigations, 
    fetchByInv, 
    updateByInv,
    deleteByInv
} from './investigation.controllers'
import authMiddleware from '../../middlewares/auth.middleware';

const investigateRoute = express.Router();
export const autoPath = 'investigation'.toLowerCase();

// add investigation data
investigateRoute.post('/create', authMiddleware, createInvestigation);

// get all investigation data
investigateRoute.get('/all', authMiddleware, fetchInvestigations);

// get one investigation data
investigateRoute.get('/:invID', authMiddleware, fetchByInv);

// update investigation data
investigateRoute.put('/:invID', authMiddleware, updateByInv);

// delete investigation data
investigateRoute.delete('/:invID', authMiddleware, deleteByInv);

export default investigateRoute;
