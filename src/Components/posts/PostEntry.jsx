import { useAuth } from '../../hooks/useAuth';
import useAxios from '../../hooks/useAxiosAuthentication';
import { useForm } from 'react-hook-form';
import Field from '../common/Field';
import { actions } from '../../actions';
import { usePost } from '../../hooks/usePost';
import { useProfile } from '../../hooks/useProfile';
import AddPhoto from '../../assets/icons/addPhoto.svg'
import { useEffect, useState } from 'react';

const PostEntry = ({ onCreate }) => {
    
    const { dispatch, postToEdit, setPostToEdit } = usePost();
    const { auth } = useAuth();
    const { api } = useAxios();
    const { state: profile } = useProfile();
    const [imagePreview, setImagePreview] = useState(null);

    const user = profile?.user ?? auth?.user;

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        reset,
        setValue 
    } = useForm();

    const imageFile = watch('image');

    
    useEffect(() => {
        if (postToEdit) {
            setValue("content", postToEdit.content);
            if (postToEdit.image) {
                setImagePreview(`${import.meta.env.VITE_SERVER_BASE_URL}/${postToEdit.image}`);
            }
        }
    }, [postToEdit, setValue]);

    useEffect(() => {
        if (imageFile && imageFile[0]) {
            const previewUrl = URL.createObjectURL(imageFile[0]);
            setImagePreview(previewUrl);
            return () => URL.revokeObjectURL(previewUrl);
        }
    }, [imageFile]);

    const handlePostSubmit = async (formData) => {
        const postData = new FormData();
        postData.append('content', formData.content);
        
        if (formData.image && formData.image[0]) {
            postData.append('image', formData.image[0]);
        }

        dispatch({ type: actions.post.DATA_FETCHING });

        try {
            const isEdit = !!postToEdit;
            const URL = isEdit 
                ? `${import.meta.env.VITE_SERVER_BASE_URL}/posts/${postToEdit.id}` 
                : `${import.meta.env.VITE_SERVER_BASE_URL}/posts`;

            const response = await api[isEdit ? 'patch' : 'post'](URL, postData);

            if (response.status === 200 || response.status === 201) {
                dispatch({ 
                    type: isEdit ? actions.post.DATA_EDITED : actions.post.DATA_CREATED, 
                    data: response.data 
                });

                // CleanUp
                setImagePreview(null);
                reset();
                setPostToEdit(null); 
                onCreate();
            }
        } catch (error) {
            dispatch({ type: actions.post.DATA_FETCH_ERROR, error: error.message });
        }
    };

    return (
        <div className="card relative">
            <h6 className="mb-3 text-center text-lg font-bold lg:text-xl">
                {postToEdit ? "Edit Post" : "Create Post"}
            </h6>

            <form onSubmit={handleSubmit(handlePostSubmit)} >
                <div className="mb-3 flex items-center justify-between gap-2 lg:mb-6 lg:gap-4">
                    <div className="flex items-center gap-3">
                        <img className="max-w-10 max-h-10 rounded-full lg:max-h-[58px] lg:max-w-[58px]"
                            src={`${import.meta.env.VITE_SERVER_BASE_URL}/${user?.avatar}`} alt="avatar" />
                        <div>
                            <h6 className="text-lg lg:text-xl">{user.firstName} {user.lastName}</h6>
                            <span className="text-sm text-gray-400 lg:text-base">Public</span>
                        </div>
                    </div>

                    <label className="btn-primary cursor-pointer !text-gray-100" htmlFor="image">
                        <img src={AddPhoto} alt="Add Photo" />
                        Add Photo
                        <input {...register('image')} name='image' id='image' type="file" className="hidden" />
                    </label>
                </div>

                <Field error={errors.content} >
                    <textarea
                        {...register('content', { required: 'Adding some text is mandatory!' })}
                        name="content" id="content" placeholder="Share your thoughts..."
                        className="h-[120px] w-full bg-transparent focus:outline-none lg:h-[160px]" />
                </Field>

                {imagePreview && (
                    <div className="relative mb-4 overflow-hidden rounded-lg border border-gray-700">
                        <img src={imagePreview} alt="Preview" className="w-full h-96 object-cover" />
                        <button
                            type="button"
                            onClick={() => {
                                setImagePreview(null);
                                setValue("image", null);
                            }}
                            className="absolute right-2 top-2 bg-black/50 text-white rounded-full p-1 hover:bg-black"
                        >
                            ✕
                        </button>
                    </div>
                )}

                <div className="border-t border-[#3F3F3F] pt-4 lg:pt-6">
                    <button className="auth-input bg-lwsGreen font-bold text-deepDark transition-all hover:opacity-90"
                        type="submit">
                        {postToEdit ? "Update Post" : "Post"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default PostEntry;