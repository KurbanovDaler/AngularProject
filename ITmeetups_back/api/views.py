from django.shortcuts import render
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from .serializers import PostSerializer, CommentSerializer
from .models import Post, Comment
from rest_framework.decorators import api_view
from rest_framework.authtoken.serializers import AuthTokenSerializer
from django.http import Http404
from django.shortcuts import get_object_or_404
# Create your views here.


class PostsView(APIView):
    permission_classes = (IsAuthenticated, )

    def post(self, request):
        serializer = PostSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def get(self, request):
        posts = Post.objects.all()
        serializer = PostSerializer(posts, many=True)

        return Response(serializer.data)


class PostDetailView(APIView):
    permission_classes = (IsAuthenticated,)

    def get_object(self, id):
        try:
            return Post.objects.get(id=id)
        except Post.DoesNotExist:
            raise Http404

    def get(self, request, pk):
        post = self.get_object(pk)
        serializer = PostSerializer(post)

        return Response(serializer.data)

    def put(self, request, pk):
        post = self.get_object(pk)

        if post.user.id == request.user.id:
            serializer = PostSerializer(instance=post, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        return Response(status=status.HTTP_403_FORBIDDEN)

    def delete(self, request, pk):
        post = self.get_object(pk)
        if post.user.id == request.user.id:
            post.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response(status=status.HTTP_403_FORBIDDEN)

# class Login(ObtainAuthToken):
#
#     def post(self, request, *args, **kwargs):
#         serializer = self.serializer_class(data=request.data,
#                                            context={'request': request})
#         serializer.is_valid(raise_exception=True)
#         user = serializer.validated_data['user']
#         token, created = Token.objects.get_or_create(user=user)
#         return Response({
#             'token': token.key
#             # 'user_id': user.pk,
#             # 'email': user.email
#         })


class CommentViewDetailed(APIView):
    permission_classes = (IsAuthenticated, )

    def get_comment(self, id):
        try:
            return Comment.objects.get(id=id)
        except Post.DoesNotExist:
            raise Http404

    def get_post(self, id):
        try:
            return Post.objects.get(id=id)
        except Post.DoesNotExist:
            raise Http404

    def get(self, request, pk):
        post = self.get_post(pk)
        comment = Comment.objects.all().filter(post=post)
        serializer = CommentSerializer(comment, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, pk):
        serializer = CommentSerializer(data=request.data)
        # serializer.initial_data.update({'user': request.user.id})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class CommentView(APIView):
    permission_classes = (IsAuthenticated, )

    def get_comment(self, id):
        try:
            return Comment.objects.get(id=id)
        except Post.DoesNotExist:
            raise Http404

    def get_post(self, id):
        try:
            return Post.objects.get(id=id)
        except Post.DoesNotExist:
            raise Http404

    def get(self, request, pk, ck):
        post = self.get_post(pk)
        # comment = self.get_comment(ck)
        #comment =
        comment = get_object_or_404(Comment.objects.all().filter(post=post)[ck-1:ck])
        # comment = Comment.objects.all().filter(post=post)
        serializer = CommentSerializer(comment)
        return Response(serializer.data, status=status.HTTP_200_OK)

    # def get(self, request):
    #     comment = Comment.objects.all(filter(Post = request.post))
    #     serializer = CommentSerializer(comment, many=True)
    #     return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request, pk, ck):
        post = self.get_post(pk)
        comment = get_object_or_404(Comment.objects.all().filter(post=post)[ck-1:ck])
        if comment.user.id == request.user.id:
            serializer = CommentSerializer(instance=comment, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
            return Response(serializer.errors, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        return Response(status=status.HTTP_403_FORBIDDEN)




@api_view(['POST'])
def login(request):
    serializer = AuthTokenSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    user = serializer.validated_data['user']
    token, created = Token.objects.get_or_create(user=user)
    return Response({'Token': token.key})


@api_view(['POST'])
def logout(request):
    request.auth.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)
