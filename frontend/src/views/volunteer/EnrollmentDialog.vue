<template>
    <v-dialog v-model="dialog" persistent max-width="600">
      <v-card>
        <v-card-title>
          <span class="headline">{{ 'New Application' }}</span>
        </v-card-title>
        <v-card-text>
          <v-form ref="form" lazy-validation>
            <v-row>
              <v-col cols="12"> 
                <v-text-field
                  label="*Motivation"
                  :rules="[v => !!v || 'Motivation is required', v => (v && v.length >= 10) || 'Motivation must be at least 10 characters']"
                  required
                  v-model="editEnrollment.motivation"
                  data-cy="motivationInput"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            variant="text"
            @click="$emit('close-enrollment-dialog')"
          >
            Close
          </v-btn>
          <v-btn
            color="blue darken-1"
            variant="text"
            @click="createEnrollment"
            :disabled="!isValid"
            data-cy="saveEnrollment"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </template>
  
  <script lang="ts">
  import { Vue, Component, Model } from 'vue-property-decorator';
  import Enrollment from '@/models/enrollment/Enrollment'; 
  import RemoteServices from '@/services/RemoteServices';
  
  @Component
  export default class EnrollmentDialog extends Vue {
    @Model('dialog', Boolean) dialog!: boolean;
  
    editEnrollment: Enrollment = new Enrollment();
  
    get isValid(): boolean {
      return true;
    }
  
    async createEnrollment() {
      
    }
  }
  </script>
  
  <style scoped lang="scss"></style>
  