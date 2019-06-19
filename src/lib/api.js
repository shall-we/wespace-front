import axios from 'axios';
import queryString from 'query-string';

// User API
export const login = (email,password,autoLogin) => axios.post('/login',{email, password, autoLogin});
export const join = (formdata) => axios.post('/join',formdata, { headers: {
    'Content-Type':'multipart/form-data;charset=utf-8'
}} );
export const getUserList = (folder_id) => axios.get(`/user?${queryString.stringify({folder_id})}`);
export const getUserListExceptFriend = (user_id) => axios.get(`/userExceptFriend?${queryString.stringify({user_id})}`);

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
export const getDeletedNoteList = (folder_id) => axios.get(`/note/deletedlist?${queryString.stringify({folder_id})}`);
export const setLock = (note_id, note_lock) => axios.patch(`/note/lock/${note_id}/${note_lock}`);
export const noteStateCheck = (uuid) => axios.get(`/note/status?${queryString.stringify({uuid})}`);
export const updateNoteStatusPublished = (note_id) => axios.patch(`/note/status/${note_id}/PUBLISHED`);
export const updateNoteStatusActived= (note_id) => axios.patch(`/note/status/${note_id}/ACTIVED`);

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



export const getSingleChat = (user_id,friend_id) => axios.get(`/chat/getSingleChat?${queryString.stringify({user_id,friend_id})}`);
export const initChatroom = (user_id,friend_id) => axios.post(`/chat/initChatroom`, {user_id,friend_id});

export const getChats = (chatroom_id, page, volume) => axios.get(`/chat/getChats?${queryString.stringify({chatroom_id,page, volume})}`);
export const insertChat = (user_id, chatroom_id, content) => axios.post(`/chat/insertChat`, {user_id, chatroom_id, content});
export const getChatParticipantsInfo = (chatroom_id) => axios.get(`/chat/getChatParticipantsInfo?${queryString.stringify({chatroom_id})}`);
export const getPrivateChatList = (user_id) => axios.get(`/chat/getPrivateChatroomList?${queryString.stringify({user_id})}`);
export const countChatroom = (chatroom_id) => axios.get(`/chat/countChatroom?${queryString.stringify({chatroom_id})}`);

export const updateChatroomTitle = (info, newTitle) => axios.patch(`/chat/updateChatRoomTitle`, {info, newTitle});
export const inviteMultiChatroom = (participants, master_id, chatroom_id) => axios.post(`/chat/inviteMultiChatroom`, {participants, master_id, chatroom_id});

export const addFriend = (user_id, friend_id) => axios.post(`/friend/add?`, {user_id, friend_id});
export const deleteFriend = (user_id, friend_id) => axios.delete(`/friend/delete?${queryString.stringify({user_id, friend_id})}`);
export const dropChatroom = (user_id, chatroom_id) => axios.delete(`/chat/dropChatroom?${queryString.stringify({user_id, chatroom_id})}`);
export const getAllFriend = (user_id) => axios.get(`/friend/getAllFriend?${queryString.stringify({user_id})}`);
export const updateChatCheckTime = (user_id, chatroom_id) => axios.patch(`/chat/updateChatCheckTime`, {user_id, chatroom_id});

export const getAllUserList = () => axios.get('/admin/user');
export const getAllFolderList = () => axios.get('/admin/folder');
export const getAllNoteList = () => axios.get('/admin/note');
export const permanentDeleteNote = (note_id) => axios.delete(`/admin/note/${note_id}`);

