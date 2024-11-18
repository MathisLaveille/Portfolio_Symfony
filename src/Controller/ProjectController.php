<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class ProjectController extends AbstractController
{
    #[Route('/projects', name: 'app_projects')]
    public function index(): Response
    {
        // Exemple de projets à afficher
        $projects = [
            [
                'title' => 'Projet de développement web',
                'description' => 'Un projet utilisant Symfony et Twig pour créer un site web dynamique.',
                'image' => '/images/web_project.jpg',
                'link' => 'https://github.com/votre-repo',
            ],
            [
                'title' => 'Application mobile',
                'description' => 'Application Android développée avec Kotlin pour la gestion de tâches.',
                'image' => '/images/mobile_project.jpg',
                'link' => 'https://github.com/votre-repo',
            ],
            // Ajoutez d'autres projets ici
        ];

        return $this->render('project/index.html.twig', [
            'projects' => $projects,
        ]);
    }
}
