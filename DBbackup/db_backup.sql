PGDMP  7                    |         
   fliki_chat    16.2    16.2 !    2           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            3           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            4           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            5           1262    24760 
   fliki_chat    DATABASE     l   CREATE DATABASE fliki_chat WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'C';
    DROP DATABASE fliki_chat;
                postgres    false            �            1259    24761    group_memberships    TABLE     �   CREATE TABLE public.group_memberships (
    group_id integer NOT NULL,
    user_id integer NOT NULL,
    is_admin boolean DEFAULT false,
    joined_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    is_online boolean DEFAULT false
);
 %   DROP TABLE public.group_memberships;
       public         heap    postgres    false            �            1259    24766    groups    TABLE     3  CREATE TABLE public.groups (
    id integer NOT NULL,
    group_name text NOT NULL,
    owner_id integer NOT NULL,
    profile_image_url text,
    description text,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);
    DROP TABLE public.groups;
       public         heap    postgres    false            �            1259    24773    groups_id_seq    SEQUENCE     �   CREATE SEQUENCE public.groups_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public.groups_id_seq;
       public          postgres    false    216            6           0    0    groups_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public.groups_id_seq OWNED BY public.groups.id;
          public          postgres    false    217            �            1259    24774    messages    TABLE        CREATE TABLE public.messages (
    id integer NOT NULL,
    message text NOT NULL,
    sender_id integer NOT NULL,
    group_id integer NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);
    DROP TABLE public.messages;
       public         heap    postgres    false            �            1259    24781    messages_id_seq    SEQUENCE     �   CREATE SEQUENCE public.messages_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.messages_id_seq;
       public          postgres    false    218            7           0    0    messages_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.messages_id_seq OWNED BY public.messages.id;
          public          postgres    false    219            �            1259    24782    users    TABLE       CREATE TABLE public.users (
    id integer NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);
    DROP TABLE public.users;
       public         heap    postgres    false            �            1259    24789    users_id_seq    SEQUENCE     �   CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.users_id_seq;
       public          postgres    false    220            8           0    0    users_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;
          public          postgres    false    221            �           2604    24790 	   groups id    DEFAULT     f   ALTER TABLE ONLY public.groups ALTER COLUMN id SET DEFAULT nextval('public.groups_id_seq'::regclass);
 8   ALTER TABLE public.groups ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    217    216            �           2604    24791    messages id    DEFAULT     j   ALTER TABLE ONLY public.messages ALTER COLUMN id SET DEFAULT nextval('public.messages_id_seq'::regclass);
 :   ALTER TABLE public.messages ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    219    218            �           2604    24792    users id    DEFAULT     d   ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);
 7   ALTER TABLE public.users ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    221    220            )          0    24761    group_memberships 
   TABLE DATA           ^   COPY public.group_memberships (group_id, user_id, is_admin, joined_at, is_online) FROM stdin;
    public          postgres    false    215   6'       *          0    24766    groups 
   TABLE DATA           r   COPY public.groups (id, group_name, owner_id, profile_image_url, description, created_at, updated_at) FROM stdin;
    public          postgres    false    216   T(       ,          0    24774    messages 
   TABLE DATA           \   COPY public.messages (id, message, sender_id, group_id, created_at, updated_at) FROM stdin;
    public          postgres    false    218   l)       .          0    24782    users 
   TABLE DATA           R   COPY public.users (id, name, email, password, created_at, updated_at) FROM stdin;
    public          postgres    false    220   1       9           0    0    groups_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.groups_id_seq', 73, true);
          public          postgres    false    217            :           0    0    messages_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.messages_id_seq', 154, true);
          public          postgres    false    219            ;           0    0    users_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.users_id_seq', 19, true);
          public          postgres    false    221            �           2606    24794 (   group_memberships group_memberships_pkey 
   CONSTRAINT     u   ALTER TABLE ONLY public.group_memberships
    ADD CONSTRAINT group_memberships_pkey PRIMARY KEY (group_id, user_id);
 R   ALTER TABLE ONLY public.group_memberships DROP CONSTRAINT group_memberships_pkey;
       public            postgres    false    215    215            �           2606    24796    groups groups_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.groups
    ADD CONSTRAINT groups_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.groups DROP CONSTRAINT groups_pkey;
       public            postgres    false    216            �           2606    24798    messages messages_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.messages
    ADD CONSTRAINT messages_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.messages DROP CONSTRAINT messages_pkey;
       public            postgres    false    218            �           2606    24800    users users_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    220            �           2606    24801 1   group_memberships group_memberships_group_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.group_memberships
    ADD CONSTRAINT group_memberships_group_id_fkey FOREIGN KEY (group_id) REFERENCES public.groups(id) ON DELETE CASCADE;
 [   ALTER TABLE ONLY public.group_memberships DROP CONSTRAINT group_memberships_group_id_fkey;
       public          postgres    false    215    216    3472            �           2606    24806 0   group_memberships group_memberships_user_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.group_memberships
    ADD CONSTRAINT group_memberships_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;
 Z   ALTER TABLE ONLY public.group_memberships DROP CONSTRAINT group_memberships_user_id_fkey;
       public          postgres    false    215    3476    220            �           2606    24811    groups groups_owner_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.groups
    ADD CONSTRAINT groups_owner_id_fkey FOREIGN KEY (owner_id) REFERENCES public.users(id) ON DELETE CASCADE;
 E   ALTER TABLE ONLY public.groups DROP CONSTRAINT groups_owner_id_fkey;
       public          postgres    false    216    220    3476            �           2606    24816    messages messages_group_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.messages
    ADD CONSTRAINT messages_group_id_fkey FOREIGN KEY (group_id) REFERENCES public.groups(id) ON DELETE CASCADE;
 I   ALTER TABLE ONLY public.messages DROP CONSTRAINT messages_group_id_fkey;
       public          postgres    false    218    216    3472            �           2606    24821     messages messages_sender_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.messages
    ADD CONSTRAINT messages_sender_id_fkey FOREIGN KEY (sender_id) REFERENCES public.users(id) ON DELETE CASCADE;
 J   ALTER TABLE ONLY public.messages DROP CONSTRAINT messages_sender_id_fkey;
       public          postgres    false    220    218    3476            )     x�}�ˍAD�3Q� ���O,�����nia!����r�mc{l��W�+��
2�$��������I�#�H�Dd�<0Z4J����}�"/e����8a8��߉�M��9��ٔ(u0e��'�����H��E0.����a��!AlK�a4Ĵv�j6����l�Sf,1�4�=&�u
*��Qϔ%��R
M�פ8��Aȥe?�5�o�J̨����h�y3ݠXʖS�� ��%��t֣�@�F�j�om��7s�}�� ~���      *     x����N�0���S��ؾ�{CC�,&8mP�Dq�x|RZ)e��;���ӡ���k�mhA�~���<|�1U���C��Cٽ�!�;�(�q������sLc��@	E�7Je��r^��2�XA5<M}����<���ziɍ��Đ�q��Ф��^7��jq�3�ᡪ�2n��f���ԧ*-��r��Z��*�����1�֓��ȹ�&�Y�����(��i�\��T� f�Ʃ9��"k�4��ҠQ+��p�����5      ,   �  x�}�Mv�FǍU�,��A~
�A2MFـ'�i��e������(�Ȯ�އ&%�� l�|��P((�^���s��5۟����'���vl�N��A���C����F���-5��uC]��L)W58=��[O"#�w��x<�<U��GEö��t34��B�F��T� 8���4q�:
�R�����}E���H؅R�K�jzGkF
�1d�m E�(^���|f7p�·R�i]�C���4��%Q!9mv�:ا�k����.�T��H�!��XHQ\�� !�K�G�,���[,E���=yi ����l��"�15�bnbx$$�H��q����-��^W��@�A�C�s-��u��%���{�N�R���:Ч�����bT�%Cd�0��e�"��R���x��A�.�R�6U%�G��D�	������v<=���EY��1��RF��t���N��2�ZOjg���ɵ�B�����nE��!�@���\K�q�p�aG��Ha��zTHk�ɇR���p��F�O���ۀe����C��"i %�nED��	�=���D����e�`M64�����j�@@�c�2�D�{bl���XoHI�ʟw�L��6�ϐ���r�9p��a����QM�:���uz�H!yk�G����Mz�H��b�"z�Rh
*�F�Rs@q��9R�V�����f/2��5Cl*՛�ʐ����� �&��t�9wR!edyddD����!�mT�%-�j!b%�%���Ȑ�y�������s)� ?���H<*������ΐ��v��:� mqK�9Rє��#إ�f�g��T�ʙњBh ]�H�TޑQ��_G�#}r���+�`�x�RQ�C�d)ip��u�V��az�)��lx���#c7�<���K�"*��������i�z��y��A6K�!X���ס���b��9����z>-���~��Y!XLw<��F�F?���)e��)����^;�M�d�Z]�2�Q��ɒ!X|��0�g��Fn (�Ka|��J"$�h�D��-��>%kV���oǞ���(Cx��ju�"ȴ��,�*{�G��ѕ,�����\	�t}x�JAb��|�wǢER�M�B*%��2���`(����&�s��%IR��!ެJ� �WIyBj����ʑJ�xJ��mF��h�s)p��@��<]�
�����Qf���v�C��}i5ڰR��#��8�#�`W�{-M�_Oc������@PpUA���H�`
�L�������O�(2ŭ_-8̒�^����.���"Y�7�V�R��H�Op��͚�馿w��o�~����k��v��F��������R�tȾ�>.��:2�K�l�)Gp������?�����Ki��2�@N�Rdt���)��kE�rD����ADi���n?�}Ŕ�W�d��9���?��ߚ�������#��88O���	���ͺF�#Hlw��/O����_�l�M���>l��v�%�[ѳ\ ���֓!x�筝�=��2���Ǡ���e�RN�����O��E�"�}A�b��W�{����[�����*�C��Z���������i�P�K"�ڣC�@�����r0v�H�fkM`�n�t��:�^������~=O/���l�j���_�m����	7|*+��f26=��x�{���tӒ��P�m��w����[O���`��A�]��&P�~)V�2�2�՚��d
�P��ҹ���
i*p�h���B���j��
֞b����u	����]�^�2}k�+��)�m�#G�Pwy9^�{;��n�#H�Ǫ���~�6u�-��~������`%%5���g�A*�������x�s>>�
���'1� IH}�R�kZ2      .   �  x�}�Ko�PF��+8-r 8�BU�P��N���)o��믭7�Fg;Y���m�Q��e{H��|r�4�hՔi���\\Rf�!����DMóK�׿�<����͈v��V�i�4�;4�5��Uo��2�����  <��	�	<�;f<�v�%� 2���~�e�e�_g����<�e0ww|6_��3G)��H�Zˆ㪺S�H��^}�u�K�x� V���YS�uޫ �E�l�YFE�|�<;�R0g�7�g�H�ċb�/�~��Z&�)��[�p��e�e� ���R�0%4J��	6���J˱�����'tTa���2�m�*�Ҕ��Q\��# 0����%$���%��1x3����T,wߩ�P��:�	��qF���Q�GUv�$whm���F8c]���@�Ġ�t�Ǉ�lh�����&r@<g�)����Z'�����5z�`6�E[�7b��e�b�p,�� �     