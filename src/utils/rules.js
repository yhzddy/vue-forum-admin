//自定义邮箱规则
var validemail = (rule, value, callback) => {
  const reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
  if (reg.test(value)) {
    callback();
  } else {
    callback(new Error("请输入合法的邮箱"));
  }
};
//自定义手机规则

var validmobile = (rule, value, callback) => {
  const reg = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
  if (reg.test(value)) {
    callback();
  } else {
    callback(new Error("请输入合法的手机号"));
  }
};

export default {
  username: [
    { required: true, message: "请输入账号", trigger: "blur" },
    { min: 3, max: 10, message: "长度在 3 到 10 个字符", trigger: "blur" }
  ],
  //验证密码是否合法
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    { min: 6, max: 15, message: "长度在 6 到 15 个字符", trigger: "blur" }
  ],
  email: [
    { required: true, message: "请输入邮箱", trigger: "blur" },
    { validator: validemail, trigger: "blur" }
  ],
  mobile: [
    { required: true, message: "请输入手机号", trigger: "blur" },
    { validator: validmobile, trigger: "blur" }
  ]
};
