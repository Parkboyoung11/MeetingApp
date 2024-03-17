<template>
    <div>
        <h1>BOOKING LIST </h1>
        <table class="booking-list" id="booking-table">
            <thead>
                <tr>
                    <th>No.</th>
                    <th>Booking Date</th>
                    <th>Start time - End time</th>
                    <th>Content</th>
                    <th>Organizer</th>
                    <th>Room Name</th>
                    <th class="action-column">Action</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(meeting, index) in meetings" :key="index">
                    <td>{{ meeting.id }}</td>
                    <td>{{ meeting.booking_date }}</td>
                    <td>{{ meeting.start_time }} - {{ meeting.end_time }}</td>
                    <td>{{ meeting.description }}</td>
                    <td>{{ meeting.organizer_name }}</td>
                    <td>{{ meeting.room_name }}</td>
                    <td class="action-column"><input type="checkbox" name="delete-row"></td>
                </tr>
            </tbody>
        </table>


        <h1>CREATE A BOOKING</h1>
        <form @submit.prevent="submitForm">
            <table>
            <tr>
                <td><label for="booking-date">Booking Date:</label></td>
                <td><input type="date" id="booking-date" v-model="booking_date"></td>
            </tr>
            <tr>
                <td><label for="start-time">Start Time:</label></td>
                <td><input type="time" id="start-time" v-model="start_time"></td>
            </tr>
            <tr>
                <td><label for="end-time">End Time:</label></td>
                <td><input type="time" id="end-time" v-model="end_time"></td>
            </tr>
            <tr>
                <td><label for="content">Content:</label></td>
                <td><textarea id="content" v-model="description"></textarea></td>
            </tr>
            <tr>
                <td><label for="booker">Booker:</label></td>
                <td><input type="text" id="booker" v-model="organizer_id"></td>
            </tr>
            <tr>
                <td><label for="room-name">Room Name:</label></td>
                <td>
                <select id="room-name" v-model="room_id">
                    <option value="1">Hoang Sa</option>
                    <option value="2">Truong Sa</option>
                </select>
                </td>
            </tr>
            </table>
            <br>
            <input type="button" @click="createMeeting" value="Submit">
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
            meetings: [],
            booking_date: '',
            start_time: '',
            end_time: '',
            description: '',
            organizer_id: '',
            room_id: ''
        };
    },
    async created() {
        try {
        const response = await axios.get('http://localhost:5001/meeting');
            this.meetings = response.data.data;
        } catch (error) {
            console.error(error);
        }
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
        async submitForm() {
                
        },

        async createMeeting() {
            const meeting = {
                booking_date: this.booking_date,
                start_time: this.start_time,
                end_time: this.end_time,
                description: this.description,
                organizer_id: this.organizer_id,
                room_id: this.room_id
            };

            try {
                const response = await axios.post('http://localhost:5001/meeting', meeting);
                console.log(response.data);
            } catch (error) {
                console.error(error);
            }    
        }
    },
};
</script>
\
<style scoped>
.booking-list {
  max-width: 1200px;
  text-align: left;
}

.booking-list thead {
  font-size: 16px;
  font-weight: bold;
}

.booking-list tbody {
  font-size: 14px;
}

.booking-list thead tr, .booking-list tbody tr {
  display: grid;
  grid-template-columns: repeat(6, 1fr) 1fr; /* Thêm cột "Action" vào đây */
}

.booking-list tr:last-child {
  border-bottom: 1px solid black;
}

.booking-list tr td:nth-child(6), .booking-list th:nth-child(6) {
  border-right: 1px solid black;
}

.booking-list th, .booking-list td {
  border-left: 1px solid black;
  border-top: 1px solid black;
  padding: 5px 5px;
  text-align: center;
}

.booking-list .action-column {
  white-space: nowrap;
  border-right: 1px solid black; /* Thêm biên bên phải cho cột "Action" */
}

</style>  