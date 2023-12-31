PGDMP         ,                {         
   la_boleria #   14.9 (Ubuntu 14.9-0ubuntu0.22.04.1) #   14.9 (Ubuntu 14.9-0ubuntu0.22.04.1)     .           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            /           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            0           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            1           1262    33347 
   la_boleria    DATABASE     _   CREATE DATABASE la_boleria WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'en_US.UTF-8';
    DROP DATABASE la_boleria;
                postgres    false            �            1259    33463    cakes    TABLE     A  CREATE TABLE public.cakes (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    price numeric(10,2) NOT NULL,
    image character varying(255),
    description text,
    CONSTRAINT cakes_name_check CHECK ((length((name)::text) >= 2)),
    CONSTRAINT cakes_price_check CHECK ((price > (0)::numeric))
);
    DROP TABLE public.cakes;
       public         heap    postgres    false            �            1259    33462    cakes_id_seq    SEQUENCE     �   CREATE SEQUENCE public.cakes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.cakes_id_seq;
       public          postgres    false    210            2           0    0    cakes_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.cakes_id_seq OWNED BY public.cakes.id;
          public          postgres    false    209            �            1259    33476    clients    TABLE     �   CREATE TABLE public.clients (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    address character varying(255) NOT NULL,
    phone character varying(15) NOT NULL
);
    DROP TABLE public.clients;
       public         heap    postgres    false            �            1259    33475    clients_id_seq    SEQUENCE     �   CREATE SEQUENCE public.clients_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.clients_id_seq;
       public          postgres    false    212            3           0    0    clients_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public.clients_id_seq OWNED BY public.clients.id;
          public          postgres    false    211            �            1259    33485    orders    TABLE     �   CREATE TABLE public.orders (
    id integer NOT NULL,
    "clientId" integer,
    "cakeId" integer,
    quantity integer NOT NULL,
    "createdAt" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    "totalPrice" numeric(10,2) NOT NULL
);
    DROP TABLE public.orders;
       public         heap    postgres    false            �            1259    33484    orders_id_seq    SEQUENCE     �   CREATE SEQUENCE public.orders_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public.orders_id_seq;
       public          postgres    false    214            4           0    0    orders_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public.orders_id_seq OWNED BY public.orders.id;
          public          postgres    false    213            �           2604    33466    cakes id    DEFAULT     d   ALTER TABLE ONLY public.cakes ALTER COLUMN id SET DEFAULT nextval('public.cakes_id_seq'::regclass);
 7   ALTER TABLE public.cakes ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    210    209    210            �           2604    33479 
   clients id    DEFAULT     h   ALTER TABLE ONLY public.clients ALTER COLUMN id SET DEFAULT nextval('public.clients_id_seq'::regclass);
 9   ALTER TABLE public.clients ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    211    212    212            �           2604    33488 	   orders id    DEFAULT     f   ALTER TABLE ONLY public.orders ALTER COLUMN id SET DEFAULT nextval('public.orders_id_seq'::regclass);
 8   ALTER TABLE public.orders ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    214    213    214            �           2606    33474    cakes cakes_name_key 
   CONSTRAINT     O   ALTER TABLE ONLY public.cakes
    ADD CONSTRAINT cakes_name_key UNIQUE (name);
 >   ALTER TABLE ONLY public.cakes DROP CONSTRAINT cakes_name_key;
       public            postgres    false    210            �           2606    33472    cakes cakes_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.cakes
    ADD CONSTRAINT cakes_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.cakes DROP CONSTRAINT cakes_pkey;
       public            postgres    false    210            �           2606    33483    clients clients_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.clients
    ADD CONSTRAINT clients_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.clients DROP CONSTRAINT clients_pkey;
       public            postgres    false    212            �           2606    33491    orders orders_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.orders DROP CONSTRAINT orders_pkey;
       public            postgres    false    214            �           2606    33497    orders orders_cakeId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.orders
    ADD CONSTRAINT "orders_cakeId_fkey" FOREIGN KEY ("cakeId") REFERENCES public.cakes(id) ON DELETE CASCADE;
 E   ALTER TABLE ONLY public.orders DROP CONSTRAINT "orders_cakeId_fkey";
       public          postgres    false    3226    210    214            �           2606    33492    orders orders_clientId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.orders
    ADD CONSTRAINT "orders_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES public.clients(id) ON DELETE CASCADE;
 G   ALTER TABLE ONLY public.orders DROP CONSTRAINT "orders_clientId_fkey";
       public          postgres    false    212    3228    214           