import axios from 'axios';
import queryString from 'query-string';

// User API
export const login = (email,password,autoLogin) => axios.post('/login',{email, password, autoLogin});
export const join = (formdata) => axios.post('/join',formdata, { headers: {
    'Content-Type':'multipart/form-data;charset=utf-8'
}} );
export const getUserList = (folder_id) => axios.get(`/user?${queryString.stringify({folder_id})}`);
export const autoLogin = () => axios.get('/autoLogin');
export const logout = () => axios.get('/logout');

export const deleteUser = (id) => axios.delete(`/admin/user/${id}`);

// Folder API
export const createFolder = (user_id,name) => axios.post('/folder',{name,user_id});
export const getSharedList = (user_id) => axios.get(`/folder/shared?${queryString.stringify({user_id})}`);
export const getPrivateList = (user_id) => axios.get(`/folder/private?${queryString.stringify({user_id})}`);
export const updateFolder = (folder_id, folder_name) => axios.patch(`/folder/${folder_id}/${folder_name}`);
export const deleteFolder = (folder_id) => axios.delete(`/folder/${folder_id}`);
export const sharedFolder = (user_id,folder_id,permission) => axios.post('/folder/shared',{user_id,folder_id,permission});
export const unsharedFolder = (folder_id,user_id) => axios.delete(`/folder/shared/${folder_id}/${user_id}`);

// Note API
export const createNote = (folder_id,name) => axios.post('note',{folder_id,name});
export const getNoteList = (folder_id) => axios.get(`/note/list?${queryString.stringify({folder_id})}`);
export const updateNote = (note_id, note_name) => axios.patch(`note/${note_id}/${note_name}`);
export const updateNoteStatusDeleted = (note_id) => axios.patch(`/note/status/${note_id}/DELETED`);
export const getSearchNoteList = (folder_id, search) => axios.get(`/note/searchlist?${queryString.stringify({folder_id, search})}`);
export const setLock = (note_id, note_lock) => axios.patch(`/note/lock/${note_id}/${note_lock}`);
export const getLock = (note_id) => axios.get(`/note/lock?${queryString.stringify({note_id})}`);
// export const getNoteCount = () => axios.get('/admin/note');

// Notice API
export const sendMessage = (type,from,object,message,option,to) => axios.post('/notice',{type,from,object,message,option,to});
export const getNoticeList = (id,type,user_id) => axios.get(`/notice?${queryString.stringify({id,type,user_id})}`);
export const updateNoticeList = (to, object,type) => axios.patch(`/notice/${to}/${object}/${type}`);

// Attachment API
export const addAttachment = (note_id, uploadList) => axios.post(`/attachment/create/${note_id}`, uploadList, { headers: {
    'Content-Type':'multipart/form-data;charset=utf-8'
}});
export const deleteAttachment = (attachment_id) => axios.delete(`/attachment/${attachment_id}`);
export const getAttachmentList = (note_id) => axios.get(`/attachment/list?${queryString.stringify({note_id})}`);
export const downloadAttachment = (url) => axios.post('/attachment/download', {url});

// Admin API
export const getAnnouncementList = () => axios.get('/admin/announcement');
export const createAnnouncement = (title, content) => axios.post('/admin/announcement', { title, content });
export const getAnnouncement = (id) => axios.get(`/admin/announcement/${queryString.stringify({id})}`);
export const updateAnnouncement = (id, title, content) => axios.patch(`/admin/announcement/${id}`, { title, content });
export const deleteAnnouncement = (id) => axios.delete(`/admin/announcement/${id}`);

export const getAllUserList = () => axios.get('/admin/user');
export const getAllFolderList = () => axios.get('/admin/folder');
export const getAllNoteList = () => axios.get('/admin/note');
export const permanentDeleteNote = (note_id) => axios.delete(`/admin/note/${note_id}`);
