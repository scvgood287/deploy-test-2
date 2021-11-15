import React, { useState } from "react";
import styled from "styled-components";
import { useAtom } from "jotai";
import axios from "axios";
import {
  selectedImage,
  selectedFile,
  uploadedFilesLengthAtom,
  uploadFiles,
} from "../../state/uploadState";
import { getExistImageAtom } from "../../state/state";
import {
  FormDiv,
  TypeTagsInput,
  PrevImageWrap,
} from "../../styles/uploadForms";

const InputWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 24px;
`;

const PrevImageArea = ({ id, tags, update, gameName }) => {
  if (tags) {
    const { main, sub, optional } = tags;
    console.log(tags);
    const [selectImage, setSelectImage] = useAtom(selectedImage);
    const [selectFile, setSelectedFile] = useAtom(selectedFile);
    const isTagsAvailable = selectFile
      ? selectFile.hasOwnProperty("tags")
      : false;

    const [addedFiles, setFiles] = useState([]);
    const [toPostFiles, setPostFiles] = useState();
    const [fileLength] = useAtom(uploadedFilesLengthAtom);
    const [checked, setChecked] = useState(0);
    const [existImage, setExist] = useAtom(getExistImageAtom);
    const [uploadFile, setUploadFile] = useAtom(uploadFiles);

    const tagMainValue = document.getElementById("main");
    const tagSubValue = document.getElementById("sub");
    const tagOptionValue = document.getElementById("option");

    console.log(selectFile);

    if (selectFile) {
      selectFile.hasOwnProperty("tags")
        ? ((tagMainValue.value = selectFile.tags.main),
          (tagSubValue.value = selectFile.tags.sub),
          (tagOptionValue.value = selectFile.tags.optional))
        : tagMainValue
        ? ((tagMainValue.value = ""),
          (tagSubValue.value = ""),
          (tagOptionValue.value = ""),
          (tagMainValue.placeholder = main),
          (tagSubValue.placeholder = sub),
          (tagOptionValue.placeholder = optional))
        : null;
    }
    console.log(checked + "/" + fileLength);

    let fileList = [];
    let imageUrl = selectImage ? selectImage : null;

    const setFileTags = (selectFilesInfo) => {
      let newFileList = [...addedFiles];
      let editUploadFile = [...uploadFile];
      selectFilesInfo.edited = true;
      // info: {
      //   gameId: id,
      //   tags: {
      //     main: tagMainValue,
      //     sub: tagSubValue,
      //     optional: tagOptionValue,
      //   },
      //   name: `${tagMainValue}_${tagSubValue}${tagOptionValue ? '_' + tagOptionValue : ''}`
      // },
      // file: selectFilesInfo,

      const combFile = {
        gameId: id,
        tags: {
          main: tagMainValue.value,
          sub: tagSubValue.value,
          optional: tagOptionValue.value,
        },
        name: `${tagMainValue.value}-${tagSubValue.value}${
          tagOptionValue.value ? "-" + tagOptionValue.value : ""
        }`,
        imageUrl: selectFilesInfo,
      };

      // 수정된 파일 목록에서 삭제
      const filteredEditedFile = editUploadFile.filter(
        (item) => item.edited === false
      );
      setUploadFile(filteredEditedFile);

      Object.values(uploadFile).map((file) => {
        const blob = file.slice(0, file.size, "image/jpg");
        const newFile = new File([blob], `${id}/${combFile.name}`, {
          type: "image/png",
        });
        console.log(newFile);
      });

      newFileList.push(combFile);
      setFiles(newFileList);
      console.log(newFileList);

      const filteredFileList = (newFileList ? newFileList : []).filter(
        (item, index, arr) =>
          arr.findIndex((compare) => compare.name === item.name) === index
      );

      console.log(checked);
      console.log(filteredFileList);
      setChecked(filteredFileList.length);

      setPostFiles(filteredFileList);
      tagMainValue.focus();
      tagMainValue.value = "";
      tagSubValue.value = "";
      tagOptionValue.value = "";
    };

    const postFiles = async () => {
      await Promise.all(
        toPostFiles.map(async (toPostFile) => {
          const formData = new FormData();
          formData.append(`${gameName}`, toPostFile.imageUrl);

          const s3Url = await axios.post(`/toS3`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          const response = await axios.post(`/images/${id}`, {
            ...toPostFile,
            imageUrl: s3Url.data,
          });
          console.log(response.data.data);
        })
      );

      setExist(id);
      setSelectImage();
      setChecked(0);
      setFiles([]);
      setPostFiles();
    };

    const patchFiles = async () => {
      const body = {
        tags: {
          main: tagMainValue.value,
          sub: tagSubValue.value,
          optional: tagOptionValue.value,
        },
        name: `${tagMainValue.value}-${tagSubValue.value}${
          tagOptionValue.value ? "-" + tagOptionValue.value : ""
        }`,
      };
      const response = await axios.patch(`/images/${selectFile._id}`, body);
      console.log(response.data);

      setExist(id);
      setSelectImage(null);
      setChecked(0);
      setFiles([]);
      setPostFiles(null);
    };

    return (
      <FormDiv>
        <PrevImageWrap>
          <img src={imageUrl} alt="" />
        </PrevImageWrap>
        <InputWrap>
          <TypeTagsInput
            tabIndex="1"
            id="main"
            type="text"
            placeHolder={main}
          />
          <TypeTagsInput tabIndex="2" id="sub" type="text" placeHolder={sub} />
          <TypeTagsInput
            tabIndex="3"
            id="option"
            type="text"
            placeHolder={optional}
          />
          {isTagsAvailable ? (
            <button onClick={() => patchFiles()}>수정</button>
          ) : checked == fileLength ? (
            <button onClick={() => postFiles()}>업로드</button>
          ) : (
            <button onClick={() => setFileTags(selectFile)}>추가</button>
          )}
        </InputWrap>
      </FormDiv>
    );
  } else {
    return <div>Loading...</div>;
  }
};

export default PrevImageArea;
