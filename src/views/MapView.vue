<template>
    <div>
        Enter Address:
        <input type="text" v-model="address" />
        <button @click="submitAddress">Submit</button>
    </div>
    <div v-if="coordinates">
        <p>Latitude: {{ lat_value }}, Longitude: {{ lon_value }}</p>
        <p>{{ forecast }}</p>
    </div>
</template>
<script>
export default {
    data() {
        return {
            forecast: '',
            address: '',
            coordinates: null,
            lat_value: 1,
            lon_value: 1
        };
    },
    methods: {
        submitAddress() {
            // Call the geocoding function when the submit button is clicked
            this.geocodeAddress();
        },
        geocodeAddress() {
            // Replace 'YOUR_GOOGLE_MAPS_API_KEY' with your actual API key
            const apiKey = '6599ec68d0fe9872485292gct93436b';
            const apiUrl1 = `https://geocode.maps.co/search?q=${encodeURIComponent(
                this.address
            )}&api_key=${apiKey}&limit=1`;


            // Fetch the geocoding data
            fetch(apiUrl1)
                .then((response) => response.json())
                .then((data) => {
                    if (data.length > 0) {
                        // Extract the latitude and longitude from the geocoding result
                        this.coordinates = true
                        this.lat_value = data[0].lat;
                        this.lon_value = data[0].lon;
                    } else {
                        console.error('No results found for the entered address.');
                    }
                    const apiUrl2 = 'https://api.weather.gov/points/' + this.lat_value + ',' + this.lon_value + '';
                    fetch(apiUrl2)
                        .then((response) => response.json())
                        .then((data) => {
                            const apiURLForecast = data.properties.forecast;
                            fetch(apiURLForecast)
                                .then((response) => response.json())
                                .then((data) => {
                                    this.forecast = data.properties.periods[0].detailedForecast
                                })
                                .catch((error) => {
                                    console.error('Error fetching forecast data:', error);
                                });

                        })
                        .catch((error) => {
                            console.error('Error fetching weather data:', error);
                        });

                })
                .catch((error) => {
                    console.error('Error fetching geocoding data:', error);
                });
        }
    }
};
</script>

<style scoped>
/* Add any necessary styling */
</style>