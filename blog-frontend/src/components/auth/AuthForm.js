import styled from 'styled-components';
import {Link} from 'react-router-dom';
import palette from '../../lib/styles/palette';
import Button from '../common/Button';

// 회원가입 또는 로그인 폼을 보여줍니다.

const AuthFormBlock = styled.div`
    h3 {
        margin : 0;
        color : ${palette.gray[8]};
        margin-bottom : 1rem;
    }
`;

// 스타일링된 input

const StyledInput = styled.input`
    font-size : 1rem;
    border : none;
    border-bottom : 1px solid ${palette.gray[5]};
    padding-bottom : 0.5rem;
    outline : none;
    width : 100%;
    &:focus {
        border-bottom : 1px solid ${palette.gray[7]};
    }
    & + & {
        margin-top : 1rem;
    }
`;

// 폼 하단에 로그인 혹은 회원가입 링크를 보여줍니다.

const Footer = styled.div`
    margin-top : 2rem;
    text-align : right;
    a {
        color : ${palette.gray[6]};
        text-decoration : underline;
        & : hover {
            color : ${palette.gray[9]};
        }
    }
`;

const textMap = {
    login : '로그인',
    signup : '회원가입'
};

const ButtonWithMarginTop = styled(Button)`
margin-top : 1rem;`

const AuthForm = ({type, form, onChange, onSubmit}) => {
    // type에 따라 다른 텍스트를 표시하기 위해 textMap을 사용합니다.
    const text = textMap[type];
    return (
        <AuthFormBlock>
            {/* 해당 인증 형식에 대한 제목을 출력합니다. */}
            <h3>{text}</h3>
            <form onSubmit={onSubmit}>
                {/* 사용자 이름을 입력할 수 있는 입력 필드를 제공합니다. */}
                <StyledInput autoComplete='username' name='username' placeholder='아이디' onChange={onChange} value = {form.username} />
                {/* 비밀번호를 입력할 수 있는 입력 필드를 제공합니다. */}
                <StyledInput autoComplete='password' name='password' placeholder='비밀번호' type='password' onChange = {onChange} value={form.password} />
                {/* 회원가입 폼인 경우에만 비밀번호 확인 입력 필드를 제공합니다. */}
                {type === 'register' && (
                    <StyledInput 
                        autoComplete="new-password"
                        name='passwordConfirm'
                        placeholder="비밀번호 확인"
                        type='password'
                        onChange = {onChange}
                        value={form.passwordConfirm}
                    />
                )}
                <ButtonWithMarginTop cyan fullWidth style = {{marginTop : '1rem'}}>
                    {text}
                </ButtonWithMarginTop>
            </form>
            <Footer>
    {type === 'login' ? (
        <Link to='/register'>회원가입</Link>
    ) : (
        <Link to='/login'>로그인</Link>
    )}
</Footer>

        </AuthFormBlock>
    )
}

export default AuthForm;