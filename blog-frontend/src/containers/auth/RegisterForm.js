import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeField, initializeForm, register } from "../../modules/auth";
import AuthForm from "../../components/auth/AuthForm";
import {check} from '../../modules/user';
import {useNavigate} from "react-router-dom";

const RegisterForm = () => {
    const dispatch = useDispatch();
    const {form, auth, authError, user} = useSelector(({auth, user}) => ({
        form : auth.register,
        auth : auth.auth,
        authError : auth.authError,
        user : user.user
    }));

    const navigate = useNavigate();

    // 인풋 변경 이�

    // 인풋 변경 이벤트 핸들러
    const onChange = e => {
        const {value, name} = e.target;
        dispatch(
            changeField({
                form: 'register',
                key : name,
                value : value
            })
        );
    };

    // 폼 등록 이벤트 핸들러
    const onSubmit = e => {
        e.preventDefault();
        const {username, password, passwordConfirm} = form;
        if (password !== passwordConfirm) {
            return;
        }
        dispatch(register({username, password}));
    };

    // 컴포넌트가 처음 렌더링될 경우 form을 초기화함
    useEffect(() => {
        dispatch(initializeForm('register'));
    }, [dispatch]);

    // 회원 가입 성공 / 실패 처리
    useEffect(() => {
        if (authError) {
            console.log("오류 발생");
            console.log(authError);
            return;
        }
        if (auth) {
            console.log("회원가입 성공");
            console.log(auth)
            dispatch(check());
        }
     }, [auth, authError, dispatch]);

     // user 값이 잘 설정되어있는지 확인합니다.
     useEffect(() => {
        if (user) {
            console.log("check API 성공");
            console.log(user);
        }
     }, [navigate, user]);

    return (
        <AuthForm
            type="register"
            form={form}
            onChange={onChange}
            onSubmit={onSubmit}
        />
    )
}

export default RegisterForm;