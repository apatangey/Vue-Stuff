<template>
    <div>
        Enter City Name and State Abbreviation:
        <input type="text" v-model="address" />
        <button @click="submitAddress">Submit</button>
        <br />
        (example: Los Angeles, CA)
    </div>
    <div v-if="coordinates">
        <p>Latitude: {{ lat_value }}, Longitude: {{ lon_value }}</p>
        <p>{{ forecast }}</p>
        <img v-if="imageUrl" :src="imageUrl" alt="Fetched Image" />
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
            let temp_lat = 0;
            let temp_lon = 0;


            // Fetch the geocoding data
            fetch(apiUrl1)
                .then((response) => response.json())
                .then((data) => {
                    if (data.length > 0) {
                        // Extract the latitude and longitude from the geocoding result
                        this.coordinates = true
                        this.lat_value = data[0].lat;
                        this.lon_value = data[0].lon;
                        temp_lat = data[0].lat;
                        temp_lon = data[0].lon;
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

            let mapURL = 'https://maps.geoapify.com/v1/staticmap?style=osm-bright-smooth&width=800&height=600&center=lonlat:' + temp_lon + ',' + temp_lat + '&zoom=12.1401&apiKey=d548c5ed24604be6a9dd0d989631f783';
            fetch(mapURL)
                .then(response => response.json())
                .then(data => {
                    // Assuming the API response has an 'imageUrl' property
                    this.imageUrl = data.imageUrl;
                })
                .catch(error => {
                    console.error('Error fetching image:', error);
                });



        }
    }
};
</script>

<style scoped>
/* Add any necessary styling */
</style>