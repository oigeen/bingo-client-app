import '@mdi/font/css/materialdesignicons.css'; // Ensure you are using css-loader
import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
    icons: {
        iconfont: 'mdi'
    },
    theme: {
        themes: {
            light: {
                primary: "#D33F49",
                // secondary: "#F5AE51",
                secondary: "#FEDB71",
                secondary_light: "#FEEAAE",  
                success: "#20BF55 "
            }
        }
    }

});
