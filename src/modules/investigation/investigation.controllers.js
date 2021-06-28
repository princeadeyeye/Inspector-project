import { Response } from '../../utils/index';
import uniqid  from 'uniqid';
import { 
    findUserByName, 
    findUserById, 
    findInvestigations, 
    findInvestigationById,
    updateInvestigationById,
    deleteInvestigation,
    investigateCreate
} from '../../services/investigation.service';

export const createInvestigation = async(req, res, next) => {
    try {
    let request_body = req.body;
    if(!request_body) return Response(res, { status: 400, message: 'Enter the investigation info' }); 
    const { user } = req;
    const unique_id = uniqid();
    let { inspector_name, investigation_data } = request_body;
    inspector_name = `${inspector_name}`.toUpperCase();
    if(!inspector_name || !investigation_data) return Response(res, { status: 400, message: 'Enter the investigation info' }); 
    
    const userData = await findUserByName(inspector_name);
    if(!userData) return Response(res, { status: 400, message: 'This investigator does not exist' }); 

    if(userData.unique_id !== user.unique_id) return Response(res, { status: 409, message: 'Investigator not permitted' }); 
    request_body.unique_id = unique_id;
    request_body.inspector_name = inspector_name;
    
    const createInvestigationData = await investigateCreate(request_body)    
    if(!createInvestigationData) return Response(res, { status: 400, message: 'Unable to create investigatons' }); 
    return Response(res, { 
        status: 200, 
        data: {
            inspector_name: createInvestigationData.inspector_name,
            investigation_data: createInvestigationData.investigation_data,
            unique_id: createInvestigationData.unique_id,
            created: createInvestigationData.created,
        },  
        message: 'Successfully create investigation' });    
    } catch(error) {
        next(error)
    }
};

export const fetchInvestigations = async(req, res, next) => {
    try {
        const { user } = req;
        if(!user)  return Response(res, { status: 409, message: 'This investigator does not exists' });
        const inspector_name = user.inspector_name;
        const investigations = await findInvestigations(inspector_name);
        if(!investigations)  return Response(res, { status: 409, message: 'Bad request, An error has occured' });
        return Response(res, { status: 200, data: investigations,  message: 'Successfully fetch all investigation by name' });    
    } catch(error) {
        next(error);
    }
};

export const fetchByInv = async(req, res, next) => {
    try {
        const { user } = req;
        const { invID } = req.params;
        if(!user)  return Response(res, { status: 409, message: 'This investigator oes not exists' });
        const inspector_name = user.inspector_name;
        const investigations = await findInvestigationById(invID);
        if(!investigations)  return Response(res, { status: 409, message: 'Bad request, An error has occured' });
        return Response(res, { status: 200, data: investigations,  message: 'Successfully fetch investigation by Id' });    
    } catch(error) {
        next(error);
    }
};

export const updateByInv = async(req, res, next) => {
    try {
        const { user } = req;
        const { invID } = req.params;
        const { investigation_data } = req.body;

        if(!user)  return Response(res, { status: 409, message: 'This investigator does not exists' });
        const inspector_name = user.inspector_name;
        const investigation = await findInvestigationById(invID);
        if(investigation.inspector_name !== inspector_name)  return Response(res, { status: 403, message: 'UnAuthorized Investigator' });
        const investigations = await updateInvestigationById(invID, investigation_data);
        if(!investigations)  return Response(res, { status: 409, message: 'Bad request, An error has occured' });
        delete investigations._id;
        return Response(res, { 
            status: 200, 
            data: {
                "inspector_name": investigations.inspector_name,
                "investigation_data": investigations.investigation_data,
                "unique_id": investigations.unique_id,
                "created": investigations.created,
                "updated": investigations.updated
            },  
            message: 'Successfully update investigation' });    
    } catch(error) {
        next(error);
    }
};

export const deleteByInv = async(req, res, next) => {
    try {
        const { user } = req;
        const { invID } = req.params;

        if(!user)  return Response(res, { status: 409, message: 'This investigator does not exists' });
        const inspector_name = user.inspector_name;
        const investigation = await findInvestigationById(invID);
        if(investigation.inspector_name !== inspector_name)  return Response(res, { status: 403, message: 'UnAuthorized Investigator' });
        const investigations = await deleteInvestigation(invID);
        if(!investigations)  return Response(res, { status: 409, message: 'Bad request, An error has occured' });
        return Response(res, { status: 200,  message: 'Successfully delete investigation' });    
    } catch(error) {
        next(error);
    }
};



