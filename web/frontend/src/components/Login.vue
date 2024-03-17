<template>
  <div>
        <h2>Login</h2>
        <form @submit.prevent="login">
            <label>
                Username:
                <input v-model="username" type="text" required>
            </label>
            <label>
                Password:
                <input v-model="password" type="password" required>
            </label>
            <button type="submit">Login</button>
        </form>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            username: '',
            password: '',
        };
    },
    methods: {
        async login() {
            try {
                const response = await axios.post('http://localhost:5001/login', {
                    username: this.username,
                    password: this.password,
                });
                console.log(response.data);
            } catch (error) {
                console.error(error);
            }
        },
    },
};
</script>


<style scoped>

</style>