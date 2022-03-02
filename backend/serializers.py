from rest_framework import serializers
from .models import Episode
import logging
import json
import sys
import re
from datetime import datetime

# #Cluster
# class ClusterSerializer(serializers.ModelSerializer):
#     #Many to many relationship between sets and clusters
#     # sets = SetSerializer(many=True, read_only=True)
#     class Meta:
#         ordering = ['-id']
#         model = Cluster
#         fields = ('id', 'title', 'description','block', 'subject', 'owner_username', 'owner', 'sets')
#         extra_kwargs = {'sets': {'required': False}}
  
#     def create(self, validated_data):
#         #Cluster
#         creator = self.context['request'].user
#         cluster = Cluster.objects.create(title=validated_data.get('title', 'no-title'), description=validated_data.get('description', 'no-description'),block=self.context.get('view').request.data.get('block'),subject=self.context.get('view').request.data.get('subject'), owner= self.context['request'].user, owner_username= self.context['request'].user.username )
#         #Get the sets array from fronend
#         setsArray =self.context.get('view').request.data.get('setsArray')
#         #To split set ids
#         setsArray = setsArray.split(',')
#         cluster.sets.set(setsArray)
#         #Adding the sets one by one, bun intended (One is the name of my cat)
#         # for set in setsArray:
#         #     cluster.sets.add(set)
#         #RETURN
#         return cluster

#     def update(self, instance, validated_data):
#         #CLUSTER
#         cluster = instance
#         instance.title = validated_data['title']
#         instance.description = validated_data['description']
#         setsArray =self.context.get('view').request.data.get('setsArray')
#         setsArray = setsArray.split(',')
#         print(setsArray)

#         instance.sets.set(setsArray)

#         #Saving and returning

#         instance.save()
#         return instance





#Episode
class EpisodeSerializer(serializers.ModelSerializer):

    
    class Meta:
        ordering = ['-id']
        model = Episode
        fields = ('id', 'awareness', 'duration','datee', 'type', 'medications', 'notes', 'condition', 'owner_username', 'owner')
        
        
    def create(self, validated_data):
        #Episode
        creator = self.context['request'].user
        episode = Episode.objects.create(awareness=validated_data.get('awareness', 'no-awareness'), datee=datetime.now(), type=validated_data.get('type', 'no-type'),medications=validated_data.get('medications', 'no-medications'),notes=validated_data.get('notes', 'no-notes'),duration=self.context.get('view').request.data.get('duration'),disease=self.context.get('view').request.data.get('disease'), condition=self.context.get('view').request.data.get('condition'), owner= self.context['request'].user, owner_username= self.context['request'].user.username )
        return episode


    def update(self, instance, validated_data):
        #Episode
        episode = instance
        instance.awareness = validated_data['awareness']
        instance.type = validated_data['type']
        instance.medications = validated_data['medications']
        instance.notes = validated_data['notes']
        instance.duration = validated_data['duration']
        instance.datee = datetime.now()


        #Saving and returning
        instance.save()
        return instance

