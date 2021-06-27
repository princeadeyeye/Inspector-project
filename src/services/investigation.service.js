import investigtionModel from "../models/investigation.model";
import userModel from "../models/user.model"


export const findUserByName = async (inspector_name) => {
    const findUser = await userModel.findOne({ inspector_name });
    return findUser;
};

export const findUserById = async (id) => {
    const findUser = await userModel.findOne({ id });
    return findUser;
};

export const investigateCreate = async(userData) => {
    const createInvestigate = await investigtionModel.create(userData);
    return createInvestigate;
};

export const findInvestigations = async (inspector_name) => {
    const investigate = await investigtionModel.find({ inspector_name }, '-_id');
    return investigate;
}

export const findInvestigationById = async (unique_id) => {
    const investigate = await investigtionModel.findOne({ unique_id }, '-_id');
    return investigate;
}

export const updateInvestigationById = async (unique_id, investigation_data) => {
    const investigate = await investigtionModel.findOneAndUpdate({ unique_id }, { investigation_data, updated: Date.now() }, {new: true});
    return investigate;
}

export const deleteInvestigation = async (unique_id) => {
    const investigate = await investigtionModel.findOneAndDelete({ unique_id });
    return investigate;
}