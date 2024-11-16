import  { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment/moment';
import axios from '../../../../services/axiosClient.js';
import Swal from 'sweetalert2';
import { useSelector } from 'react-redux';
import './CommentSection.css';

const CommentSection = ({ productId }) => {
    const [dataComment, setDataComment] = useState([]);
    const [comment, setComment] = useState({ message: "", images: "", product_id: productId, account_id: 0 });
    const [commentRep, setCommentRep] = useState({ message: "", images: "", commentDescription_ID: 0, comment_ID: 0, account_ID: 0 });
    const [images1, setImages1] = useState("");
    const [imageBytes, setImageBytes] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [openCommentId, setOpenCommentId] = useState(null);
    const account = useSelector(state => state.auth.currentUser);

    useEffect(() => {
        setComment(prevState => ({ ...prevState, product_id: productId, account_id: account.id }));
        setCommentRep(prevState => ({ ...prevState, account_ID: account.id }));
        findAllComment();
    }, [productId, account.id]);

    const convertToByteArray = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                const arrayBuffer = e.target.result;
                const base64String = btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)));
                resolve(base64String);
            };
            reader.readAsArrayBuffer(file);
        });
    };

    const handleImage = async (e) => {
        const fileInput = e.target;
        if (fileInput.files.length > 0) {
            try {
                const file = fileInput.files[0];

                setSelectedFile(file);
                const base64String = await convertToByteArray(file);
                setImageBytes(base64String);

                const blob = new Blob([new Uint8Array(file)]);
                const imageURLs = URL.createObjectURL(blob);
            } catch (e) {
                Swal.fire("Lỗi khi upload ảnh");
            }

        } else {
            Swal.fire("Vui lòng chọn ảnh");
            setImages1("");
        }
    };

    const handleImageRep = async (e, imgSrcs) => {
        const fileInput = e.target;
        const imgSrc = document.querySelector("." + imgSrcs);
        if (fileInput.files.length > 0) {
            const file = fileInput.files[0];
            setSelectedFile(file);
            const base64String = await convertToByteArray(file);
            setImageBytes(base64String);

            const blob = new Blob([new Uint8Array(file)]);
            const imageURLs = URL.createObjectURL(blob);
            imgSrc.src = imageURLs;
        } else {
            Swal.fire("Vui lòng chọn ảnh");
            setImages1("");
        }
    };

    const addComment = async () => {
        if (comment.message === "") {
            Swal.fire("Chưa nhập nội dung bình luận");
            return;
        }
        if (selectedFile !== null) {
            comment.images = imageBytes;
        }
        await axios.post(`https://localhost:44382/api/Comment/CreateComment`, comment)
            .then(() => {
                findAllComment();
                setImages1("");
                setImageBytes(null);
                setComment({ ...comment, message: "", images: "" });

            })
            .catch(error => {
                console.error(error);
            });
    };

    const rep1User = async (idValue, idComment) => {
        const value = document.getElementById(idValue).value;
        const newCommentRep = {
            message: value,
            images: selectedFile !== null ? imageBytes : "",
            commentDescription_ID: 0,
            comment_ID: idComment,
            account_ID: account.id
        };
        if (newCommentRep.message === "") {
            return;
        }
        await axios.post('https://localhost:44382/api/Comment/CreateComemntDescription', newCommentRep)
            .then(() => {
                findAllComment();
                setCommentRep({ ...commentRep, message: "", images: "" });
                setOpenCommentId(null);
            })
            .catch(error => {
                console.error(error);
            });
    };


    const rep2User = async (idValue, idComment) => {
        const value = document.getElementById(idValue).value;
        const newCommentRep = {
            message: value,
            images: selectedFile !== null ? imageBytes : "",
            commentDescription_ID: idComment,
            comment_ID: 0,
            account_ID: account.id
        };

        if (newCommentRep.message === "") {
            return;
        }
        if (selectedFile !== null) {
            newCommentRep.images = imageBytes;
        }

        await axios.post(`https://localhost:44382/api/Comment/CreateComemntDescription`, newCommentRep)
            .then(() => {
                findAllComment();
                setCommentRep({ ...newCommentRep, message: "", images: "" });
                setOpenCommentId(null);
            })
            .catch(error => {
                console.error(error);
            });
    };

    const rep3User = async (idValue, idComment) => {
        const value = document.getElementById(idValue).value;
        const newCommentRep = {
            message: value,
            images: selectedFile !== null ? imageBytes : "",
            commentDescription_ID: idComment,
            comment_ID: 0,
            account_ID: account.id
        };

        if (newCommentRep.message === "") {
            return;
        }
        if (selectedFile !== null) {
            newCommentRep.images = imageBytes;
        }

        await axios.post(`https://localhost:44382/api/Comment/CreateComemntDescription`, newCommentRep)
            .then(() => {
                findAllComment();
                setCommentRep({ ...newCommentRep, message: "", images: "" });
                setOpenCommentId(null);
            })
            .catch(error => {
                console.error(error);
            });
    };


    const findAllComment = async () => {
        await axios.get(`https://localhost:44382/api/Comment/FindAll?idPR=${productId}&page=1&pageSize=1000`)
            .then(response => {
                console.log(response);
                setDataComment(response.content.data);
            })
            .catch(error => {
                console.error(error.content);
            });
    };

    return (
        <div>
            <h2>Bình luận</h2>
            {dataComment.map((item) => (
                <div key={item.ids1} style={{ display: 'flex', flexDirection: 'row' }}>
                    <img
                        style={{ width: '20px', height: '20px' }}
                        src={`data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyOCIgaGVpZ2h0PSIyOCI+CiAgICA8cGF0aCBmaWxsPSJyZ2JhKDE1MywgMTUzLCAxNTMsIDAuNykiIGQ9Ik0xOC40IDE4LjVsMi41IDUgLjIuNWg2LjlsLTIuMS00LjMtNC4xLTEuNXYtMi41YzEuMi0xLjEgMS44LTMuMiAxLjgtNS4xIDAtMi4xLTItMy42LTMuNS0zLjZzLTMuNSAxLjYtMy41IDMuNmMwIDEuOS41IDQgMS44IDUuMXYyLjVoLS4xbC4xLjN6Ii8+CiAgICA8cGF0aCBmaWxsPSJyZ2IoMTUzLCAxNTMsIDE1MykiIGQ9Ik0xNy41IDE5bC01LTEuOHYtM2MxLjQtMS4yIDItMy44IDItNS45IDAtMi40LTIuMy00LjMtNC00LjMtMS43IDAtNCAxLjgtNCA0LjMgMCAyLjIuNiA0LjcgMiA1Ljl2M2wtNSAxLjgtMi41IDVoMTlsLTIuNS01eiIvPgo8L3N2Zz4K`}
                        alt="avatar"
                    />
                    <div>
                        <div>
                            <span><strong>{item.accountName}</strong></span>
                            <span> - {moment(item.createdAt).format("DD/MM/YYYY")}</span>
                        </div>
                        <div style={{ textAlign: 'left' }}>
                            <p>{item.message}</p>
                        </div>
                        {item.image && (
                            <div style={{ textAlign: 'left' }}>
                                <img width="100" src={`data:image/*;base64,${item.image}`} alt="comment" />
                            </div>
                        )}
                        <div style={{ textAlign: 'left' }}>
                            <button
                                style={{ border: 'none', outline: 'none', backgroundColor: 'transparent', width: '50px', height: '30px' }}
                                onClick={() => setOpenCommentId(openCommentId === item.ids1 + "rep1" ? null : item.ids1 + "rep1")}
                            >
                                <i className="fa fa-comment" aria-hidden="true"></i>
                            </button>
                        </div>
                        {openCommentId === item.ids1 + "rep1" && (
                            <div className="rep1_container">
                                <img className="imgrep" src="" alt="" />
                                <div className="input-wrapper">
                                    <input
                                        type="text"
                                        id={`reply_${item.ids1}_main`}
                                        placeholder="Nhập bình luận..."
                                    />
                                    <button
                                        onClick={() => rep1User(`reply_${item.ids1}_main`, item.ids1)}
                                        type="button"
                                    >
                                        Gửi
                                    </button>
                                </div>
                                <div className="form-wrapper">
                                    <input
                                        id={`file_${item.ids1}_main`}
                                        type="file"
                                        onChange={(event) => handleImageRep(event, `imgrep_${item.ids1}_main`)}
                                        className="form-control"
                                    />
                                    <label htmlFor={`file_${item.ids1}_main`}>
                                        <i className="fa fa-file" aria-hidden="true"></i>
                                    </label>
                                </div>
                            </div>
                        )}


                        {item.commentDescription && (
                            <div>
                                {item.commentDescription.map((itemRep2) => (
                                    <div key={`${itemRep2.ids}-${item.ids1}`} style={{ marginLeft: '20px' }}>
                                        <img
                                            style={{ width: '20px', height: '20px', borderRadius: '50%', marginRight: '10px' }}
                                            src={`data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyOCIgaGVpZ2h0PSIyOCI+CiAgICA8cGF0aCBmaWxsPSJyZ2JhKDE1MywgMTUzLCAxNTMsIDAuNykiIGQ9Ik0xOC40IDE4LjVsMi41IDUgLjIuNWg2LjlsLTIuMS00LjMtNC4xLTEuNXYtMi41YzEuMi0xLjEgMS44LTMuMiAxLjgtNS4xIDAtMi4xLTItMy42LTMuNS0zLjZzLTMuNSAxLjYtMy41IDMuNmMwIDEuOS41IDQgMS44IDUuMXYyLjVoLS4xbC4xLjN6Ii8+CiAgICA8cGF0aCBmaWxsPSJyZ2IoMTUzLCAxNTMsIDE1MykiIGQ9Ik0xNy41IDE5bC01LTEuOHYtM2MxLjQtMS4yIDItMy44IDItNS45IDAtMi40LTIuMy00LjMtNC00LjMtMS43IDAtNCAxLjgtNCA0LjMgMCAyLjIuNiA0LjcgMiA1Ljl2M2wtNSAxLjgtMi41IDVoMTlsLTIuNS01eiIvPgo8L3N2Zz4K`}
                                            alt="avatar"
                                        />
                                        <div>
                                            <span><strong>{itemRep2.account_Name}</strong></span>
                                            <span> - {moment(itemRep2.createdAt).format("DD/MM/YYYY")}</span>
                                        </div>
                                        <div style={{ textAlign: 'left' }}>
                                            <p>{itemRep2.messagedescription}</p>
                                        </div>
                                        {itemRep2.image && (
                                            <div style={{ textAlign: 'left' }}>
                                                <img width="100" src={`data:image/*;base64,${itemRep2.image}`} alt="reply" />
                                            </div>
                                        )}
                                        <div style={{ textAlign: 'left' }}>
                                            <button
                                                style={{ border: 'none', outline: 'none', backgroundColor: 'transparent', width: '50px', height: '30px' }}
                                                onClick={() => setOpenCommentId(openCommentId === itemRep2.ids + "rep2" ? null : itemRep2.ids + "rep2")}
                                            >
                                                <i className="fa fa-comment" aria-hidden="true"></i>
                                            </button>
                                        </div>
                                        {openCommentId === itemRep2.ids + "rep2" && (
                                            <div className="rep2_container" style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start' }}>
                                                <img className="imgrep" width="100" src="" alt="" />
                                                <div style={{ backgroundColor: 'white', borderRadius: '10px', padding: '10px', flex: 1 }}>
                                                    <input
                                                        type="text"
                                                        id={`reply_${itemRep2.ids}_sub`}
                                                        style={{ padding: '5px 10px', borderRadius: '10px', border: '1px solid #ddd', outline: 'none', width: 'calc(100% - 60px)', marginBottom: '5px' }}
                                                        placeholder="Nhập bình luận..."
                                                    />
                                                    <button
                                                        onClick={() => rep2User(`reply_${itemRep2.ids}_sub`, itemRep2.ids)}
                                                        type="button"
                                                        style={{ width: '50px', height: '30px', borderRadius: '10px', border: 'none', outline: 'none', backgroundColor: '#007bff', color: '#fff', cursor: 'pointer' }}
                                                    >
                                                        Gửi
                                                    </button>
                                                </div>
                                                <div className="form-wrapper" style={{ marginLeft: '10px' }}>
                                                    <input
                                                        style={{ display: 'none' }}
                                                        id={`file_${itemRep2.ids}_sub`}
                                                        type="file"
                                                        onChange={(event) => handleImageRep(event, `imgrep_${itemRep2.ids}_sub`)}
                                                        className="form-control"
                                                    />
                                                    <label htmlFor={`file_${itemRep2.ids}_sub`}>
                                                        <i style={{ fontSize: '24px', color: '#007bff' }} className="fa fa-file" aria-hidden="true"></i>
                                                    </label>
                                                </div>
                                            </div>
                                        )}
                                        {itemRep2.commentRep && (
                                            <div className='rep3'>
                                                {itemRep2.commentRep.map((subItem) => (
                                                    <div key={`${subItem.ids}-${subItem.ids1}`} style={{ marginBottom: '10px' }}>
                                                        <img
                                                            style={{ width: '20px', height: '20px', borderRadius: '50%', marginRight: '10px' }}
                                                            src={`data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyOCIgaGVpZ2h0PSIyOCI+CiAgICA8cGF0aCBmaWxsPSJyZ2JhKDE1MywgMTUzLCAxNTMsIDAuNykiIGQ9Ik0xOC40IDE4LjVsMi41IDUgLjIuNWg2LjlsLTIuMS00LjMtNC4xLTEuNXYtMi41YzEuMi0xLjEgMS44LTMuMiAxLjgtNS4xIDAtMi4xLTItMy42LTMuNS0zLjZzLTMuNSAxLjYtMy41IDMuNmMwIDEuOS41IDQgMS44IDUuMXYyLjVoLS4xbC4xLjN6Ii8+CiAgICA8cGF0aCBmaWxsPSJyZ2IoMTUzLCAxNTMsIDE1MykiIGQ9Ik0xNy41IDE5bC01LTEuOHYtM2MxLjQtMS4yIDItMy44IDItNS45IDAtMi40LTIuMy00LjMtNC00LjMtMS43IDAtNCAxLjgtNCA0LjMgMCAyLjIuNiA0LjcgMiA1Ljl2M2wtNSAxLjgtMi41IDVoMTlsLTIuNS01eiIvPgo8L3N2Zz4K`}
                                                            alt="avatar"
                                                        />
                                                        <div>
                                                            <span><strong>{subItem.account_Name}</strong></span>
                                                            <span> - {moment(subItem.createdAt).format("DD/MM/YYYY")}</span>
                                                        </div>
                                                        <div style={{ textAlign: 'left' }}>
                                                            <p>{subItem.messagedescription}</p>
                                                        </div>
                                                        <div style={{ textAlign: 'left' }}>
                                                            <button
                                                                style={{ border: 'none', outline: 'none', backgroundColor: 'transparent', width: '50px', height: '30px' }}
                                                                onClick={() => setOpenCommentId(openCommentId === subItem.ids ? null : subItem.ids)}
                                                            >
                                                                <i className="fa fa-comment" aria-hidden="true"></i>
                                                            </button>
                                                        </div>
                                                        {openCommentId === subItem.ids && (
                                                            <div className="rep2_container" style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start' }}>
                                                                <img className="imgrep" width="100" src="" alt="" />
                                                                <div style={{ backgroundColor: 'white', borderRadius: '10px', padding: '10px', flex: 1 }}>
                                                                    <input
                                                                        type="text"
                                                                        id={`reply_${itemRep2.ids}_sub`}
                                                                        style={{ padding: '5px 10px', borderRadius: '10px', border: '1px solid #ddd', outline: 'none', width: 'calc(100% - 60px)', marginBottom: '5px' }}
                                                                        placeholder="Nhập bình luận..."
                                                                    />
                                                                    <button
                                                                        onClick={() => rep3User(`reply_${itemRep2.ids}_sub`, itemRep2.ids)}
                                                                        type="button"
                                                                        style={{ width: '50px', height: '30px', borderRadius: '10px', border: 'none', outline: 'none', backgroundColor: '#007bff', color: '#fff', cursor: 'pointer' }}
                                                                    >
                                                                        Gửi
                                                                    </button>
                                                                </div>
                                                                <div className="form-wrapper" style={{ marginLeft: '10px' }}>
                                                                    <input
                                                                        style={{ display: 'none' }}
                                                                        id={`file_${itemRep2.ids}_sub`}
                                                                        type="file"
                                                                        onChange={(event) => handleImageRep(event, `imgrep_${itemRep2.ids}_sub`)}
                                                                        className="form-control"
                                                                    />
                                                                    <label htmlFor={`file_${itemRep2.ids}_sub`}>
                                                                        <i style={{ fontSize: '24px', color: '#007bff' }} className="fa fa-file" aria-hidden="true"></i>
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}

                    </div>
                </div>
            ))}
            <div className="commentRep">
                <div className="user">
                    <img src={account.image} width="80" height="80" alt="User" className="user-image" />
                </div>
                <div className="write-comment">
                    <textarea
                        placeholder="Viết bình luận..."
                        value={comment.message}
                        onChange={(e) => setComment({ ...comment, message: e.target.value })}
                        className="comment-textarea"
                    ></textarea>
                    <div className="actions">
                        <button onClick={addComment} className="send-button">
                            <i className="fa fa-paper-plane" aria-hidden="true"></i>
                        </button>
                        <div className="file-upload">
                            <input
                                type="file"
                                id="file_main"
                                className="file-input"
                                onChange={handleImage}
                            />
                            <label htmlFor="file_main" className="file-label">
                                <i className="fa fa-file" aria-hidden="true"></i>
                            </label>
                        </div>
                    </div>
                    {images1 && <img src={images1} width="100" alt="Preview" className="image-preview" />}
                </div>
            </div>

        </div>
    );
};

CommentSection.propTypes = {
    productId: PropTypes.number.isRequired,
};

export default CommentSection;
