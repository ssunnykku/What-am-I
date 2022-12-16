import { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { EditUserImg } from '../apis/mypageFetcher';
import { font } from '../assets/styles/common/fonts';
import { theme } from '../assets/styles/common/palette';

const AITestPage = () => {
  const [dogName, setDogName] = useState<string>('');
  const [preview, setPreview] = useState<string>('');
  const [aiImage, setAiImage] = useState<File>();

  const imageInputRef = useRef<HTMLInputElement>(null);

  const handleChangeFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length !== 0) {
      setPreview(URL.createObjectURL(e.target.files[0]));
      setAiImage(e.target.files[0]);
    }
  };

  return (
    <AiTestBox>
      <div style={{ letterSpacing: '1px', fontSize: '23px' }}>
        여러분의 소중한 강아지는 어디서 왔을까요?
      </div>
      <InnerBox>
        <ImageBigBox>
          <ImageBox>
            {preview && <img src={preview} className="pre-img" />}
          </ImageBox>
          <InputBox>
            <div className="filebox">
              <div className="upload-box">
                <label htmlFor="file">사진 업로드</label>
              </div>
              <input
                type="file"
                id="file"
                ref={imageInputRef}
                accept="image/*"
                onChange={handleChangeFile}
              />
              <div style={{ marginTop: '15px', fontSize: '18px' }}>
                강아지 이름
              </div>
              <input
                type="text"
                className="puppy-name"
                placeholder="임펩시"
                onChange={(e: any) => setDogName(e.target.value)}
              />
            </div>
            <Link
              to={'/ailoading'}
              state={{ dogName: dogName, aiImage: aiImage }}
            >
              <TestBtn>AI로 종 분석하기</TestBtn>
            </Link>
          </InputBox>
        </ImageBigBox>
      </InnerBox>
    </AiTestBox>
  );
};

export default AITestPage;

const popup = keyframes`
  0% {
    transform: translateY(5px);
  }
  100% {
    transform: translateY(0px);
  }
`;

const AiTestBox = styled.div`
  width: 45rem;
  height: 30rem;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 20px;
  font-family: ${font.bold};
  color: ${theme.boldColor};
  background-color: ${theme.lightColor};
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const InnerBox = styled.div`
  width: 34rem;
  height: 20rem;
  margin-top: 20px;
`;

const ImageBigBox = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  height: 18rem;
  margin-top: 20px;
`;

const ImageBox = styled.div`
  position: relative;
  overflow: hidden;
  border: solid 1px ${theme.boldColor};

  .pre-img {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 0 15px;
  width: 15rem;

  .filebox .upload-box {
    border: solid 1px ${theme.boldColor};
    background-color: ${theme.backColor};
    width: 90px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    font-size: 16px;
  }

  .filebox label {
    cursor: pointer;
    width: 6rem;
    height: 2rem;
  }

  .filebox .upload-name {
    display: block;
    height: 40px;
    width: 100%;
    color: #999999;
    margin-top: 5px;
  }

  .filebox input[type='file'] {
    position: absolute;
    width: 0;
    height: 0;
    padding: 0;
    overflow: hidden;
    border: 0;
  }

  .filebox .puppy-name {
    display: block;
    height: 40px;
    width: 100%;
    margin-top: 5px;
  }
`;

const TestBtn = styled.button`
  font-family: ${font.bold};
  border: solid 1px ${theme.boldColor};
  width: 245px;
  height: 65px;
  border-radius: 10px;
  color: ${theme.boldColor};
  font-size: 23px;
  cursor: pointer;

  :hover {
    animation-duration: 0.4s;
    animation-timing-function: ease-in-out;
    animation-name: ${popup};
  }
`;
