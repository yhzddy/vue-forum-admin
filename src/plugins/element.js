import Vue from "vue";
import { Button, Form, FormItem, Loading, Input, Message } from "element-ui";

Vue.use(Button);
Vue.use(Loading);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);

Vue.prototype.$message = Message;
